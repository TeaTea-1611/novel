import { Length, Matches, type ValidationOptions } from "class-validator";

export function Password(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyKey: string | symbol) {
    Length(6, 50, {
      message: "Mật khẩu phải có từ 6 đến 50 ký tự.",
      ...validationOptions,
    })(target, propertyKey);

    Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,50}$/,
      {
        message:
          "Mật khẩu phải bao gồm chữ cái hoa, chữ cái thường, số và ký tự đặc biệt (!$@%).",

        ...validationOptions,
      },
    )(target, propertyKey);
  };
}
