import { Args, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { ChapterStatistic } from "../../generated/type-graphql";
import { ChapterStatisticArgs } from "./args";

@Service()
@Resolver(() => ChapterStatistic)
export class ChapterStatisticResolver {
  @Authorized()
  @Query(() => [ChapterStatistic])
  async chapterStatistics(
    @Args() { bookId, days }: ChapterStatisticArgs,
    @Ctx() { prisma }: Context,
  ): Promise<ChapterStatistic[]> {
    const now = new Date();

    return await prisma.chapterStatistic.findMany({
      where: {
        chapter: { bookId: bookId },
        date: { gte: new Date(now.getTime() - days * 24 * 60 * 60 * 1000) },
      },
      orderBy: { date: "desc" },
    });
  }
}
