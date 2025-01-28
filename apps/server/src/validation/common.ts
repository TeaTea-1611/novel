import { z } from "zod";

export const stringSchema = (min: number, max: number, fieldName: string) =>
  z
    .string({ required_error: `${fieldName} là bắt buộc.` })
    .min(min, { message: `${fieldName} tối thiểu ${min} ký tự.` })
    .max(max, { message: `${fieldName} tối đa ${max} ký tự.` });

// User
export const emailSchema = z
  .string({ required_error: "Bắt buộc." })
  .email({ message: "Email không hợp lệ." });

export const passwordSchema = stringSchema(6, 50, "Mật khẩu").regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,50}$/,
  {
    message: "Mật khẩu phải bao gồm chữ cái, chữ số và ký tự đặc biệt (!$@%).",
  },
);

export const nicknameSchema = stringSchema(6, 50, "Tên hiển thị");

export const introduceSchema = stringSchema(0, 255, "Giới thiệu");

// 2FA
export const twoFactorCodeSchema = z
  .string({ required_error: "Mã xác thực là bắt buộc." })
  .length(6, { message: "Mã xác thực phải gồm 6 chữ số." })
  .regex(/^\d{6}$/, { message: "Mã xác thực phải là 6 chữ số." });

// Novel
