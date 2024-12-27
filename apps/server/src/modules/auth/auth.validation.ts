import { z } from "zod";
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
  twoFactorCodeSchema,
} from "../../validation/common";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  code: twoFactorCodeSchema.optional(),
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
