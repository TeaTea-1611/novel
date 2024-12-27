import type { MiddlewareFn } from "type-graphql";
import { UserRole } from "../../../prisma/generated/type-graphql";
import type { Context } from "../../context";
import { forbiddenError } from "../utils/errors";

export const IsAdminOrSelf: MiddlewareFn<Context> = async (
  { context: { prisma, req, ...context }, root },
  next,
) => {
  if (context.user?.role === UserRole.ADMIN || context.user?.id === root.id) {
    return next();
  }

  throw forbiddenError();
};
