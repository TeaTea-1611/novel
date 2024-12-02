import {
  ArgumentValidationError,
  type MiddlewareInterface,
  type NextFn,
  type ResolverData,
} from "type-graphql";
import { Service } from "typedi";
import { type Context } from "../context";
import { Logger } from "../logger";

@Service()
export class ErrorLoggerMiddleware implements MiddlewareInterface<Context> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<Context>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      if (!(err instanceof ArgumentValidationError)) {
        this.logger.error({
          message: (err as Error).message,
          operation: info.operation.operation,
          fieldName: info.fieldName,
          userId: context.user?.id,
        });
        throw err;
      }

      throw err;
    }
  }
}
