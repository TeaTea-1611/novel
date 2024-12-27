import argon2 from "argon2";
import { OAuth2Client } from "google-auth-library";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Inject, Service } from "typedi";
import { User } from "../../../prisma/generated/type-graphql";
import type { Context } from "../../context";
import { env } from "../../env";
import {
  passwordResetTokenManager,
  verificationTokenManager,
} from "../../shared/utils/jwt";
import { MutationResponse } from "../../types";
import { handleValidationError } from "../../validation/handle-error";
import {
  LoginArgs,
  NewPasswordArgs,
  RegisterArgs,
  VerificationArgs,
} from "./auth.arg";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./auth.type";
import {
  loginSchema,
  newPasswordSchema,
  registerSchema,
} from "./auth.validation";

const oAuth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "postmessage",
);

@Service()
@Resolver(() => User)
export class AuthResolver {
  constructor(
    @Inject(() => AuthService) private readonly authService: AuthService,
  ) {}

  @Mutation(() => MutationResponse)
  async register(
    @Args() { email, nickname, password }: RegisterArgs,
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    handleValidationError(
      registerSchema.safeParse({
        email,
        nickname,
        password,
      }),
    );

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: "Email đã được sử dụng.",
      };
    }

    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: await argon2.hash(password),
        notificationSettings: {
          create: {
            newChapter: true,
            newInteraction: true,
          },
        },
      },
    });

    const token = verificationTokenManager.sign({ email });
    await this.authService.sendVerificationEmail(user, token);

    return {
      success: true,
      message: "Đăng ký tài khoản thành công, kiểm tra email để xác minh.",
    };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args() { email, password, code }: LoginArgs,
    @Ctx() { res, prisma, redis }: Context,
  ): Promise<LoginResponse> {
    handleValidationError(
      loginSchema.safeParse({
        email,
        password,
        code,
      }),
    );

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user?.password || !(await argon2.verify(user.password, password))) {
      return { success: false, message: "Thông tin đăng nhập không hợp lệ." };
    }

    if (!user.emailVerified) {
      const token = verificationTokenManager.sign({ email });
      await this.authService.sendVerificationEmail(user, token);
      return {
        success: false,
        message:
          "Tài khoản chưa được xác minh, vui lòng kiểm tra email để xác minh.",
      };
    }

    if (user.isTwoFactorEnable) {
      if (code) {
        const isValid = await this.authService.verifyTwoFactorCode(
          user.id,
          code,
          redis,
        );
        if (!isValid) {
          return { success: false, message: "Mã xác thực không hợp lệ." };
        }
      } else {
        await this.authService.createAndSendNewTwoFactorCode(user, redis);
        return {
          success: true,
          message: "Đã gửi email xác thực.",
          twoFactor: true,
        };
      }
    }

    const { accessToken, refreshToken } = await this.authService.createTokens(
      prisma,
      { userId: user.id },
    );
    this.authService.setRefreshTokenCookie(res, refreshToken);

    return {
      success: true,
      message: "Đăng nhập thành công.",
      user,
      accessToken,
    };
  }

  @Mutation(() => LoginResponse)
  async googleLogin(
    @Arg("code") code: string,
    @Ctx() { res, prisma }: Context,
  ): Promise<LoginResponse> {
    const { tokens } = await oAuth2Client.getToken(code);
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.name) {
      throw new Error("Không thể truy xuất thông tin hồ sơ người dùng.");
    }

    const { email, name } = payload;

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        nickname: name,
        emailVerified: new Date(),
      },
    });

    const { accessToken, refreshToken } = await this.authService.createTokens(
      prisma,
      { userId: user.id },
    );

    this.authService.setRefreshTokenCookie(res, refreshToken);

    return {
      success: true,
      message: "Đăng nhập thành công.",
      user,
      accessToken,
    };
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context): User | null {
    return user;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res, user, prisma }: Context): Promise<boolean> {
    const token = this.authService.getRefreshTokenCookie(req);
    if (token) {
      await prisma.refreshToken.delete({
        where: { userId: user?.id, token },
      });
      this.authService.clearRefreshTokenCookie(res);
      return true;
    }
    return false;
  }

  @Mutation(() => String, { nullable: true })
  async refreshToken(
    @Ctx() { req, res, prisma }: Context,
  ): Promise<string | null> {
    const token = this.authService.getRefreshTokenCookie(req);

    if (!token) return null;

    const refreshTokenDb = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (refreshTokenDb) {
      await prisma.refreshToken.delete({
        where: { token },
      });
      const hasExpired = new Date(refreshTokenDb.expiresAt) < new Date();

      if (!hasExpired) {
        const { accessToken, refreshToken } =
          await this.authService.createTokens(prisma, {
            userId: refreshTokenDb.userId,
          });
        this.authService.setRefreshTokenCookie(res, refreshToken);
        return accessToken;
      }
    }
    return null;
  }

  @Mutation(() => MutationResponse)
  async verification(
    @Args() { token }: VerificationArgs,
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    const decoded = verificationTokenManager.verify(token);

    if (decoded?.email) {
      await prisma.user.update({
        where: { email: decoded.email },
        data: {
          emailVerified: new Date(),
        },
      });
      return { success: true, message: "Email đã được xác minh." };
    }

    return { success: false, message: "Token không hợp lệ." };
  }

  @Mutation(() => MutationResponse)
  async passwordReset(
    @Arg("email") email: string,
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = passwordResetTokenManager.sign({ email });
      await this.authService.sendPasswordResetEmail(user, token);
    }

    return { success: true, message: "Email xác minh đã được gửi." };
  }

  @Mutation(() => MutationResponse)
  async newPassword(
    @Args() { token, newPassword }: NewPasswordArgs,
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    handleValidationError(
      newPasswordSchema.safeParse({
        newPassword,
      }),
    );
    const decoded = passwordResetTokenManager.verify(token);

    if (decoded?.email) {
      await prisma.user.update({
        where: { email: decoded.email },
        data: {
          password: await argon2.hash(newPassword),
        },
      });

      return { success: true, message: "Mật khẩu đã được cập nhật." };
    }

    return { success: false, message: "Token không hợp lệ." };
  }

  @Mutation(() => MutationResponse)
  async resendTwoFactorCode(
    @Arg("email") email: string,
    @Ctx() { user, prisma, redis }: Context,
  ): Promise<MutationResponse> {
    const targetUser =
      user || (await prisma.user.findUnique({ where: { email } }));

    if (targetUser) {
      await this.authService.createAndSendNewTwoFactorCode(targetUser, redis);
    }

    return { success: true, message: "Đã gửi mã xác thực." };
  }
}
