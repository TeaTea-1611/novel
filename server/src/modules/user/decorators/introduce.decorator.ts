import { MaxLength, type ValidationOptions } from "class-validator";

export function Introduce(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyKey: string | symbol) {
    MaxLength(200, {
      message: "Giới thiệu có tối đa 200 ký tự.",
      ...validationOptions,
    })(target, propertyKey);
  };
}
