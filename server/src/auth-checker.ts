import { type AuthChecker } from "type-graphql";
import { type Context } from "./context";
import { env } from "./env";
import { GraphQLError } from "graphql";
import { verifyRefreshToken } from "./utils/tokens";
import { throwForbiddenError } from "./utils/errors";

export const authChecker: AuthChecker<Context> = (
  { context: { req, user } },
  roles,
) => {
  if (!user) {
    const refreshToken = req.cookies[env.REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      throw new GraphQLError(
        "Không tìm thấy token xác thực! Vui lòng đăng nhập lại để tiếp tục.",
        { extensions: { code: "TOKEN_MISSING" } },
      );
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded?.sub) {
      throw new GraphQLError(
        "Token không hợp lệ hoặc đã hết hạn! Vui lòng đăng nhập lại để tiếp tục.",
        { extensions: { code: "TOKEN_INVALID" } },
      );
    }

    throw new GraphQLError(
      "Truy cập bị từ chối! Bạn cần phải được xác thực để thực hiện hành động này!",
      {
        extensions: { code: "UNAUTHENTICATED" },
      },
    );
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return throwForbiddenError();
  }

  return true;
};
