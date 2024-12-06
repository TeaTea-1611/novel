import type { MiddlewareFn } from "type-graphql";
import type { Context } from "../context";
import { env } from "../env";
import { verifyRefreshToken } from "../utils/tokens";

export const UserMiddleware: MiddlewareFn<Context> = async (
  { context: { prisma, req, ...context } },
  next,
) => {
  const refreshToken = req.cookies[env.REFRESH_TOKEN_COOKIE_NAME];
  const decoded = verifyRefreshToken(refreshToken);

  if (decoded?.sub) {
    context.user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });
  }

  return next();
};
