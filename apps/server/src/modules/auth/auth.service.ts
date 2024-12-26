import type { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import type { Request, Response } from "express";
import { Redis } from "ioredis";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { env } from "../../env";
import { sendEmail } from "../../emails/send";
import VerificationEmail from "../../emails/components/verification-email";
import PasswordResetEmail from "../../emails/components/password-reset-email";
import TwoFactorEmail from "../../emails/components/two-factor-code-email";
import type { User } from "../../../prisma/generated/type-graphql";
import { accessTokenManager } from "../../utils/jwt";

@Service()
export class AuthService {
  generateTwoFactorCode(): string {
    return crypto.randomInt(100_000, 1_000_000).toString();
  }

  async createTokens(
    prisma: PrismaClient,
    { userId, tokenFamily }: { userId: number; tokenFamily?: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existingTokens = await prisma.refreshToken.findMany({
      where: { userId },
      take: env.MAX_REFRESH_TOKEN_COUNT,
      orderBy: {
        expiresAt: "desc",
      },
    });

    if (existingTokens.length >= env.MAX_REFRESH_TOKEN_COUNT) {
      await prisma.refreshToken.delete({
        where: { token: existingTokens[existingTokens.length - 1].token },
      });
    }

    const accessToken = accessTokenManager.sign({ sub: userId });

    const refreshToken = jwt.sign({ sub: userId }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    });

    const expiresAt = new Date(
      new Date().getTime() + env.REFRESH_TOKEN_EXPIRY * 1000,
    );

    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        tokenFamily,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRY * 1000,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      domain: env.COOKIES_DOMAIN,
    });
  }

  clearRefreshTokenCookie(res: Response) {
    res.clearCookie(env.REFRESH_TOKEN_COOKIE_NAME);
  }

  getRefreshTokenCookie(req: Request) {
    return req.cookies[env.REFRESH_TOKEN_COOKIE_NAME];
  }

  async sendVerificationEmail(user: User, token: string) {
    await sendEmail({
      from: `"novels" <${env.SEND_MAIL_USER}>`,
      to: [user.email],
      subject: "Xác thực tài khoản",
      react: VerificationEmail({
        userName: user.nickname,
        validHours: env.VERIFICATION_TOKEN_EXPIRY / 3600,
        verificationUrl: `${env.WEB_URL}/verification?token=${token}`,
      }),
    });
  }

  async sendPasswordResetEmail(user: User, token: string) {
    await sendEmail({
      from: `"novels" <${env.SEND_MAIL_USER}>`,
      to: [user.email],
      subject: "Đặt lại mật khẩu",
      react: PasswordResetEmail({
        userName: user.nickname,
        validMinutes: env.PASSWORD_RESET_TOKEN_EXPIRY / 60,
        passwordResetUrl: `${env.WEB_URL}/password-reset?token=${token}`,
      }),
    });
  }

  async verifyTwoFactorCode(
    userId: number,
    code: string,
    redis: Redis,
  ): Promise<boolean> {
    const storedCode = await redis.get(`two_factor_code:${userId}`);
    return storedCode === code;
  }

  async createAndSendNewTwoFactorCode(user: User, redis: Redis): Promise<void> {
    const newCode = this.generateTwoFactorCode();
    await redis.set(`two_factor_code:${user.id}`, newCode, "EX", 300);
    await sendEmail({
      from: `"novels" <${env.SEND_MAIL_USER}>`,
      to: [user.email],
      subject: "Mã xác thực 2 lớp",
      react: TwoFactorEmail({
        userName: user.nickname,
        twoFactorCode: newCode,
        validMinutes: env.TWO_FACTOR_CODE_EXPIRE / 60,
      }),
    });
  }
}
