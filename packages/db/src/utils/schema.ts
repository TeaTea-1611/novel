import { z, ZodString, ZodEffects, ZodOptional } from "zod";

export const stringSchema = (
  field: string,
  options: {
    min?: number;
    max?: number;
    regex?: RegExp;
    regexMessage?: string;
  } = {},
) => {
  const { min, max, regex, regexMessage } = options;

  let schema: ZodString | ZodEffects<ZodString> = z.string({
    required_error: `${field} là bắt buộc.`,
  });

  if (min !== undefined) {
    schema = schema.min(min, { message: `${field} tối thiểu ${min} ký tự.` });
  }

  if (max !== undefined) {
    schema = schema.max(max, { message: `${field} tối đa ${max} ký tự.` });
  }

  if (regex !== undefined) {
    schema = schema.refine((value) => regex.test(value), {
      message: regexMessage || `${field} không hợp lệ.`,
    });
  }

  return schema;
};
