import { IsEmail, type ValidationOptions } from "class-validator";

export function Email(
  options?: validator.IsEmailOptions,
  validationOptions?: ValidationOptions,
) {
  return function (target: Object, propertyKey: string | symbol) {
    IsEmail(options, { message: "Email không hợp lệ", ...validationOptions })(
      target,
      propertyKey,
    );
  };
}
