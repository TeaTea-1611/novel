import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Reading } from "./reading.model";
import { Book } from "../book/book.model";
import type { Context } from "../../context";

@Service()
@Resolver(() => Reading)
export class ReadingResolver {
  // @UseMiddleware(UserMiddleware)
  @FieldResolver(() => Reading, { nullable: true })
  async reading(
    @Root() book: Book,
    @Ctx() { user, prisma }: Context,
  ): Promise<Reading | null> {
    if (!user) return null;

    return await prisma.reading.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: book.id,
        },
      },
    });
  }
}
