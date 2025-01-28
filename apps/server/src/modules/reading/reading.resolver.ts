import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Reading } from "./reading.model";
import type { Context } from "../../context";
import type { Novel } from "../novel/novel.model";

@Service()
@Resolver(() => Reading)
export class ReadingResolver {
  // @UseMiddleware(UserMiddleware)
  @FieldResolver(() => Reading, { nullable: true })
  async reading(
    @Root() novel: Novel,
    @Ctx() { user, prisma }: Context,
  ): Promise<Reading | null> {
    if (!user) return null;

    return await prisma.reading.findUnique({
      where: {
        userId_novelId: {
          userId: user.id,
          novelId: novel.id,
        },
      },
    });
  }
}
