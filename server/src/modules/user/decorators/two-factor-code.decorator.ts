import {
  IsOptional,
  Length,
  Matches,
  type ValidationOptions,
} from "class-validator";

export function TwoFactorCode(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyKey: string) {
    IsOptional()(target, propertyKey);

    Length(6, 6, {
      message: "Mã xác thực phải có 6 chữ số.",
      ...validationOptions,
    })(target, propertyKey);

    Matches(/^[0-9]{6}$/, {
      message: "Mã xác thực chỉ được phép chứa chữ số.",
      ...validationOptions,
    })(target, propertyKey);
  };
}
