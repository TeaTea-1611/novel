import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { Chapter } from "../../generated/type-graphql";
import { throwForbiddenError } from "../../utils/errors";
import { CreateChapterArgs } from "./args";
import { ChapterMutationResponse } from "./types";

@Service()
@Resolver(() => Chapter)
export class ChapterResolver {
  @Query(() => Chapter, { nullable: true })
  async chapter(
    @Arg("chapterId", () => Int) chapterId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Chapter | null> {
    return await prisma.chapter.findUnique({
      where: { id: chapterId },
    });
  }

  @Query(() => [Chapter])
  async chapters(
    @Arg("bookId", () => Int) bookId: number,
    @Ctx() { prisma }: Context,
  ) {
    return await prisma.chapter.findMany({
      where: { bookId },
      select: {
        id: true,
        bookId: true,
        order: true,
        title: true,
        content: false,
        publishAt: true,
        unlockPrice: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Authorized()
  @Mutation(() => ChapterMutationResponse)
  async createChapter(
    @Args()
    {
      bookId,
      content,
      order,
      publishAt,
      title,
      unlockPrice,
    }: CreateChapterArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<ChapterMutationResponse> {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return {
        success: false,
        message: "Không tìm thấy truyện.",
      };
    }

    if (book.createdById !== user!.id) {
      throwForbiddenError();
    }

    const existingChapter = await prisma.chapter.findFirst({
      where: {
        bookId: bookId,
        order: order,
      },
      select: { id: true },
    });

    if (existingChapter) {
      await prisma.chapter.updateMany({
        where: {
          bookId: bookId,
          order: { gte: order },
        },
        data: {
          order: { increment: 1 },
        },
      });
    }

    const chapter = await prisma.chapter.create({
      data: {
        bookId,
        title,
        content,
        order,
        unlockPrice,
        publishAt,
      },
    });

    return {
      success: true,
      message: "Đã thêm chương mới",
      chapter,
    };
  }
}
