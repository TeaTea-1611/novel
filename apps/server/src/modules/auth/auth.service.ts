import type { PrismaClient, User } from "@prisma/client";
import crypto from "crypto";
import type { Request, Response } from "express";
import { Redis } from "ioredis";
import { Service } from "typedi";
import { env } from "../../env";
import { sendEmail } from "../../emails/send";
import VerificationEmail from "../../emails/templates/verification-email";
import PasswordResetEmail from "../../emails/templates/password-reset-email";
import TwoFactorEmail from "../../emails/templates/two-factor-code-email";
import { accessTokenManager } from "../../shared/utils/jwt";

@Service()
export class AuthService {
  generateTwoFactorCode(): string {
    return crypto.randomInt(100_000, 1_000_000).toString();
  }

  async createTokens(
    prisma: PrismaClient,
    { userId }: { userId: number },
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

    const expiresAt = new Date(
      new Date().getTime() + env.REFRESH_TOKEN_EXPIRY * 1000,
    );

    const rf = await prisma.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });

    return { accessToken, refreshToken: rf.token };
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
