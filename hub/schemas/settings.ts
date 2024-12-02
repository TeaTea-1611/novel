import {
  emailSchema,
  introduceSchema,
  nicknameSchema,
  passwordSchema,
} from "./user";
import { z } from "zod";

export const changeAvatarSchema = z.object({
  avatar: z.instanceof(File, { message: "File không hợp lệ" }),
});

export const changeProfileSchema = z.object({
  nickname: nicknameSchema,
  introduce: introduceSchema,
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Vui lòng nhập một URL hợp lệ." }),
      }),
    )
    .optional(),
  dob: z.date(),
  gender: z.coerce.number({ required_error: "Bắt buộc." }),
});

export const changePasswordSchema = z.object({
  password: z.union([passwordSchema, z.string().length(0)]).optional(),
  newPassword: passwordSchema,
});

export const changeEmailSchema = z.object({
  email: emailSchema,
  password: z.union([passwordSchema, z.string().length(0)]).optional(),
  code: z.optional(z.string()),
});

export const changeTwoFactorSchema = z.object({
  isTwoFactorEnable: z.boolean().default(false),
  code: z.optional(z.string()),
});

export const changeNotificationsSchema = z.object({
  newChapter: z.boolean(),
  newInteraction: z.boolean(),
});
