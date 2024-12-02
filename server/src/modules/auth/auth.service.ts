import type { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import type { Request, Response } from "express";
import { Redis } from "ioredis";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { env } from "../../env";
import type { User } from "../../generated/type-graphql";
import { sendEmail } from "../../emails";
import VerificationEmail from "../../emails/emails/verification-email";
import PasswordResetEmail from "../../emails/emails/password-reset-email";
import TwoFactorEmail from "../../emails/emails/two-factor-code-email";

@Service()
export class AuthService {
  generateTwoFactorCode(): string {
    return crypto.randomInt(100_000, 1_000_000).toString();
  }

  async createTokens(userId: number, prisma: PrismaClient) {
    const existingTokens = await prisma.refreshToken.findMany({
      where: { id: userId },
      take: env.MAX_REFRESH_TOKEN_COUNT,
      orderBy: {
        expires: "desc",
      },
    });

    if (existingTokens.length >= env.MAX_REFRESH_TOKEN_COUNT) {
      await prisma.refreshToken.delete({
        where: { id: existingTokens[existingTokens.length - 1].id },
      });
    }

    const accessToken = jwt.sign(
      { sub: userId },
      env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
      },
    );

    const refreshToken = jwt.sign(
      { sub: userId },
      env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
      },
    );

    const expires = new Date(
      new Date().getTime() + env.REFRESH_TOKEN_EXPIRY * 1000,
    );

    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expires,
      },
    });

    return { accessToken, refreshToken };
  }

  setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRY * 1000,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      domain: "localhost",
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
