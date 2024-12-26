import jwt from "jsonwebtoken";
import { env } from "../env";

const createTokenManager = <T extends object>(
  secret: string,
  options: jwt.SignOptions,
) => ({
  sign: (payload: T) =>
    jwt.sign(payload, secret, { ...options, algorithm: "HS256" }),

  verify: (token: string) => {
    try {
      return jwt.verify(token, secret, {
        ...options,
        algorithms: ["HS256"],
      }) as T;
    } catch {
      return null;
    }
  },
});

export const accessTokenManager = createTokenManager<{ sub?: number }>(
  env.ACCESS_TOKEN_SECRET,
  {
    issuer: env.JWT_ISSUER,
    audience: `${env.JWT_ISSUER}:access`,
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  },
);

export const passwordResetTokenManager = createTokenManager<{ email: string }>(
  env.PASSWORD_RESET_TOKEN_SECRET,
  {
    issuer: env.JWT_ISSUER,
    audience: `${env.JWT_ISSUER}:reset`,
    expiresIn: env.PASSWORD_RESET_TOKEN_EXPIRY,
  },
);

export const verificationTokenManager = createTokenManager<{ email: string }>(
  env.VERIFICATION_TOKEN_SECRET,
  {
    issuer: env.JWT_ISSUER,
    audience: `${env.JWT_ISSUER}:verify`,
    expiresIn: env.VERIFICATION_TOKEN_EXPIRY,
  },
);
