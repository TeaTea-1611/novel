import { Length, Matches, type ValidationOptions } from "class-validator";

export function Nickname(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyKey: string | symbol) {
    Length(3, 50, {
      message: "Tên hiển thị phải có từ 3 đến 50 ký tự.",
      ...validationOptions,
    })(target, propertyKey);

    Matches(/^[a-zA-Z0-9\s]+$/, {
      message: "Tên hiển thị chỉ được chứa chữ cái, số và khoảng trắng.",
      ...validationOptions,
    })(target, propertyKey);
  };
}
