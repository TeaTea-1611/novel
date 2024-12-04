import { z } from "zod";
import { stringSchema } from "./helper";

export const emailSchema = z
  .string({ required_error: "Bắt buộc." })
  .email({ message: "Email không hợp lệ." });

export const passwordSchema = stringSchema(6, 50, "Mật khẩu").regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,50}$/,
  {
    message: "Mật khẩu phải bao gồm chữ cái, chữ số và ký tự đặc biệt (!$@%).",
  },
);

export const nicknameSchema = stringSchema(6, 50, "Tên hiển thị").regex(
  /^[a-zA-Z0-9\s]+$/,
  {
    message: "Tên hiển thị chỉ được chứa chữ cái, số và khoảng trắng.",
  },
);

export const introduceSchema = stringSchema(0, 255, "Giới thiệu");
