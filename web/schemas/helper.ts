import { z } from "zod";

export const stringSchema = (min: number, max: number, fieldName: string) =>
  z
    .string({ required_error: `${fieldName} là bắt buộc.` })
    .min(min, { message: `${fieldName} tối thiểu ${min} ký tự.` })
    .max(max, { message: `${fieldName} tối đa ${max} ký tự.` });
