import { type AuthChecker } from "type-graphql";
import { type Context } from "./context";
import { env } from "./env";
import { GraphQLError } from "graphql";
import { forbiddenError, tokenError } from "./shared/utils/errors";

export const authChecker: AuthChecker<Context> = async (
  { context: { req, user, prisma } },
  roles,
) => {
  if (!user) {
    const refreshToken = req.cookies[env.REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      throw new GraphQLError("Vui lòng đăng nhập lại để tiếp tục.", {
        extensions: { code: "TOKEN_MISSING" },
      });
    }

    const token = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!token) {
      throw tokenError();
    }

    if (token.expiresAt < new Date()) {
      throw tokenError();
    }

    throw new GraphQLError(
      "Truy cập bị từ chối! Bạn cần phải được xác thực để thực hiện hành động này!",
      { extensions: { code: "UNAUTHENTICATED" } },
    );
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    throw forbiddenError();
  }

  return true;
};
