import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { BookStatistic, Reading } from "../../generated/type-graphql";

@Service()
@Resolver(() => Reading)
export class AnalyticsResolver {
  @Authorized()
  @Query(() => [BookStatistic])
  async analytics(@Ctx() { prisma, user }: Context): Promise<BookStatistic[]> {
    return await prisma.bookStatistic.findMany({
      where: { book: { createdById: user!.id } },
    });
  }
}
