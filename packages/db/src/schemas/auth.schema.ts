import { z } from "zod";
import { stringSchema } from "../utils/schema";
import { emailSchema, nicknameSchema, passwordSchema } from "./user.schema";

export const twoFactorCodeSchema = stringSchema("Mã xác thực", {
  min: 6,
  max: 6,
  regex: /^\d{6}$/,
  regexMessage: "Mã xác thực phải là 6 chữ số.",
});

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

export const newPasswordSchema = z.object({
  newPassword: passwordSchema,
});
