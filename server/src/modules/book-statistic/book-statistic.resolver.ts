import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { Book, BookStatistic } from "../../generated/type-graphql";
import { BookSummary } from "./types";

@Service()
@Resolver(() => BookStatistic)
export class BookStatisticResolver {
  @FieldResolver(() => Book)
  book(
    @Root() bookStatistic: BookStatistic,
    @Ctx() { dataLoaders: { bookLoader } }: Context,
  ) {
    return bookLoader.load(bookStatistic.bookId);
  }

  @Authorized()
  @Query(() => [BookStatistic])
  async myBookStatistics(
    @Arg("days", () => Int) days: number,
    @Ctx() { prisma, user }: Context,
  ): Promise<BookStatistic[]> {
    const now = new Date();

    return await prisma.bookStatistic.findMany({
      where: {
        book: { createdById: user!.id },
        date: { gte: new Date(now.getTime() - days * 24 * 60 * 60 * 1000) },
      },
      orderBy: { date: "asc" },
    });
  }

  @Authorized()
  @Query(() => [BookStatistic])
  async bookStatistics(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("days", () => Int) days: number,
    @Ctx() { prisma }: Context,
  ): Promise<BookStatistic[]> {
    const now = new Date();

    return await prisma.bookStatistic.findMany({
      where: {
        bookId: bookId,
        date: { gte: new Date(now.getTime() - days * 24 * 60 * 60 * 1000) },
      },
      orderBy: { date: "asc" },
    });
  }

  @Authorized()
  @Query(() => BookSummary)
  async myBookSummary(@Ctx() { prisma, user }: Context): Promise<BookSummary> {
    const totalAnalytics = await prisma.book.aggregate({
      where: { createdById: user!.id },
      _sum: {
        readCnt: true,
        chapterCnt: true,
        commentCnt: true,
        reviewCnt: true,
        flowerCnt: true,
      },
      _avg: {
        points: true,
      },
    });

    return {
      readCnt: totalAnalytics._sum.readCnt || 0,
      commentCnt: totalAnalytics._sum.commentCnt || 0,
      chapterCnt: totalAnalytics._sum.chapterCnt || 0,
      reviewCnt: totalAnalytics._sum.reviewCnt || 0,
      avgPoints: totalAnalytics._avg.points || 0,
    };
  }
}
