import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Bắt buộc." })
  .email({ message: "Email không hợp lệ." });

export const passwordSchema = z
  .string({ required_error: "Mật khẩu là bắt buộc." })
  .min(6, { message: "Mật khẩu tối thiểu 6 ký tự." })
  .max(50, { message: "Mật khẩu tối đa 50 ký tự." })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,50}$/, {
    message: "Mật khẩu phải bao gồm chữ cái, chữ số và ký tự đặc biệt (!$@%).",
  });

export const nicknameSchema = z
  .string({ required_error: "Tên hiển thị là bắt buộc." })
  .min(6, { message: "Tên hiển thị tối thiểu 6 ký tự." })
  .max(50, { message: "Tên hiển thị tối đa 50 ký tự." });

export const introduceSchema = z
  .string({ required_error: "Giới thiệu là bắt buộc." })
  .min(0, { message: "Giới thiệu tối thiểu 0 ký tự." })
  .max(255, { message: "Giới thiệu tối đa 255 ký tự." });

export const twoFactorCodeSchema = z
  .string({ required_error: "Mã xác thực là bắt buộc." })
  .length(6, { message: "Mã xác thực phải gồm 6 chữ số." })
  .regex(/^\d{6}$/, { message: "Mã xác thực phải là 6 chữ số." });

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
