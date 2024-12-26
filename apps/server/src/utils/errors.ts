import { GraphQLError } from "graphql";

export const forbiddenError = () => {
  return new GraphQLError(
    "Truy cập bị từ chối! Bạn không có quyền truy cập tài nguyên này.",
    { extensions: { code: "FORBIDDEN" } },
  );
};

export const tokenError = () => {
  return new GraphQLError("Token không hợp lệ hoặc đã hết hạn.", {
    extensions: { code: "TOKEN_ERROR" },
  });
};
