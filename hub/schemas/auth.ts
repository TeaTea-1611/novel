import { z } from "zod";
import { emailSchema, nicknameSchema, passwordSchema } from "./user";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: z.optional(z.string().length(6, { message: "Mã phải có 6 ký tự" })),
});

export const registerSchema = z.object({
  nickname: nicknameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const passwordResetSchema = z.object({
  email: emailSchema,
});

export const newPasswordSchema = z.object({
  newPassword: passwordSchema,
});
