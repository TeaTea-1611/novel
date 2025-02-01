import { z } from "zod";
import { Gender } from "../../generated/client";
import { stringSchema } from "../utils/schema";

export const emailSchema = stringSchema("Email", {
  min: 3,
  max: 255,
  regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  regexMessage: "Email không hợp lệ.",
});

export const passwordSchema = stringSchema("Mật khẩu", {
  min: 6,
  max: 50,
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,50}$/,
  regexMessage:
    "Mật khẩu phải bao gồm chữ cái, chữ số và ký tự đặc biệt (!$@%).",
});

export const nicknameSchema = stringSchema("Tên hiển thị", {
  min: 6,
  max: 50,
});

export const bioSchema = stringSchema("Giới thiệu", {
  max: 255,
  required: false,
});

export const changeProfileSchema = z.object({
  nickname: nicknameSchema,
  bio: bioSchema,
  socialLinks: z
    .array(
      z.object({
        value: z.string().url({ message: "Vui lòng nhập một URL hợp lệ." }),
      }),
    )
    .optional(),
  birthDate: z.date(),
  gender: z.nativeEnum(Gender),
});
