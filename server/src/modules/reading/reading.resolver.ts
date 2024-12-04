import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { Book, Reading } from "../../generated/type-graphql";
import { PaginatedReading } from "./types";
import { MutationResponse } from "../../types";

@Service()
@Resolver(() => Reading)
export class ReadingResolver {
  @FieldResolver(() => Book)
  async book(@Root() root: Reading, @Ctx() { prisma }: Context) {
    return await prisma.book.findUnique({
      where: { id: root.bookId },
    });
  }

  @Authorized()
  @Query(() => PaginatedReading)
  async reading(
    @Ctx() { prisma, user }: Context,
    @Arg("take", () => Int) take: number,
    @Arg("cursor", { nullable: true }) cursor?: string,
  ): Promise<PaginatedReading> {
    const realTake = Math.min(10, take);

    const totalCount = await prisma.reading.count({
      where: { userId: user!.id },
    });

    const data = await prisma.reading.findMany({
      where: {
        userId: user!.id,
        ...(cursor && { readingAt: { lt: cursor } }),
      },
      take: realTake,
      orderBy: {
        readingAt: "desc",
      },
    });

    const hasMore =
      data.length === realTake &&
      data[data.length - 1].readingAt.toString() !== cursor;

    return {
      totalCount,
      cursor: data.length ? data[data.length - 1].readingAt : null,
      reading: data,
      hasMore,
    };
  }

  @Mutation(() => Boolean)
  async read(
    @Arg("chapterId", () => Int) chapterId: number,
    @Ctx() { prisma, user }: Context,
  ): Promise<Boolean> {
    const date = new Date();

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { id: true, order: true, bookId: true },
    });

    if (!chapter) {
      return false;
    }

    if (user) {
      await prisma.reading.upsert({
        where: {
          userId_bookId: {
            userId: user!.id,
            bookId: chapter.bookId,
          },
        },
        create: {
          userId: user!.id,
          bookId: chapter.bookId,
          currentChapter: chapter.order,
          readingAt: date,
        },
        update: {
          currentChapter: chapter.order,
          readingAt: date,
        },
        select: { userId: true },
      });
    }

    await Promise.all([
      prisma.chapter.update({
        where: { id: chapter.id },
        data: { readCnt: { increment: 1 } },
        select: { id: true },
      }),
      prisma.book.update({
        where: { id: chapter.bookId },
        data: { readCnt: { increment: 1 } },
        select: { id: true },
      }),
      prisma.bookStatistic.upsert({
        where: {
          bookId_date: {
            bookId: chapter.bookId,
            date,
          },
        },
        create: {
          bookId: chapter.bookId,
          date,
          read: 1,
        },
        update: {
          read: { increment: 1 },
        },
        select: { id: true },
      }),
    ]);

    return true;
  }
}
