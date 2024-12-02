import { GraphQLError } from "graphql";

export const throwForbiddenError = () => {
  throw new GraphQLError("Bạn không có quyền thực hiện hành động này!", {
    extensions: {
      code: "FORBIDDEN",
    },
  });
};
