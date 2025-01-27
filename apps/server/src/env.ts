import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  server: {
    HOST: z.string().default("localhost"),
    PORT: z.number().default(4000),

    // Db
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),

    // Google
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_TTS_KEY: z.string(),

    // Mail
    SEND_MAIL_USER: z.string(),
    SEND_MAIL_PASS: z.string(),

    WEB_URL: z.string().url(),

    NODE_ENV: z.string().default("development"),

    // Cấu hình GraphQL
    GRAPHQL_PATH: z.string().default("/graphql"),
    GRAPHQL_UPLOAD_MAX_FILE_SIZE: z.number().default(10 * 1024 * 1024), // 10 MB
    GRAPHQL_UPLOAD_MAX_FILES: z.number().default(10),

    // Tokens
    JWT_ISSUER: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    PASSWORD_RESET_TOKEN_SECRET: z.string(),
    VERIFICATION_TOKEN_SECRET: z.string(),

    ACCESS_TOKEN_EXPIRY: z.number().default(900), // 15 phút
    REFRESH_TOKEN_EXPIRY: z.number().default(604800), // 7 ngày
    PASSWORD_RESET_TOKEN_EXPIRY: z.number().default(300), // 5 phút
    VERIFICATION_TOKEN_EXPIRY: z.number().default(3600), // 1 giờ

    VERIFICATION_TOKEN_EXPIRE: z.number().default(300), // 5 phút
    FORGOT_PASSWORD_TOKEN_EXPIRE: z.number().default(300), // 5 phút
    TWO_FACTOR_CODE_EXPIRE: z.number().default(300), // 5 phút

    // Cookies
    COOKIES_DOMAIN: z.string().default("localhost"),

    // Giới hạn khác
    MAX_REFRESH_TOKEN_COUNT: z.number().default(3),
    REFRESH_TOKEN_COOKIE_NAME: z.string().default("rt"),
  },

  runtimeEnv: process.env,
});
