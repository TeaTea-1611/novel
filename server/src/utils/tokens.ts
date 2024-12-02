import { sign, verify } from "jsonwebtoken";
import { env } from "../env";

export const verifyAccessToken = (token: string) => {
  try {
    return verify(token, env.ACCESS_TOKEN_SECRET as string) as {
      sub?: number;
    };
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return verify(token, env.REFRESH_TOKEN_SECRET as string) as {
      sub?: number;
    };
  } catch {
    return null;
  }
};

export const signPasswordResetToken = (email: string) => {
  return sign({ email }, env.PASSWORD_RESET_TOKEN_SECRET as string, {
    expiresIn: env.PASSWORD_RESET_TOKEN_EXPIRY,
  });
};

export const verifyPasswordResetToken = (token: string) => {
  try {
    return verify(token, env.PASSWORD_RESET_TOKEN_SECRET as string) as {
      email?: string;
    };
  } catch {
    return null;
  }
};

export const signVerificationToken = (email: string) => {
  return sign({ email }, env.VERIFICATION_TOKEN_SECRET as string, {
    expiresIn: env.VERIFICATION_TOKEN_EXPIRY,
  });
};

export const verifyVerificationToken = (token: string) => {
  try {
    return verify(token, env.VERIFICATION_TOKEN_SECRET as string) as {
      email?: string;
    };
  } catch {
    return null;
  }
};
