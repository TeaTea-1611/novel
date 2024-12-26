import { GraphQLError } from "graphql";
import type { ZodError } from "zod";

export const handleValidationError = <T>(validationResult: {
  success: boolean;
  error?: ZodError;
  data?: T;
}): T | undefined => {
  if (!validationResult.success) {
    throw new GraphQLError("Trường không hợp lệ.", {
      extensions: {
        code: "VALIDATION_ERROR",
        errors: validationResult.error?.errors,
      },
    });
  }
  return validationResult.data;
};
