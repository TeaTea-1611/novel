import {
  Arg,
  Args,
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
import { Chapter } from "../../generated/type-graphql";
import { throwForbiddenError } from "../../utils/errors";
import { CreateChapterArgs, SwapChaptersArgs, UpdateChapterArgs } from "./args";
import { ChapterMutationResponse } from "./types";
import { MutationResponse } from "../../types";
import { handleValidationError } from "../../utils/validation";
import { createChapterSchema } from "../../schemas";

@Service()
@Resolver(() => Chapter)
export class ChapterResolver {
  @FieldResolver(() => String)
  content(@Root() chapter: Chapter, @Ctx() {}: Context) {
    // TODO
    return chapter.content;
  }

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
  ): Promise<Chapter[]> {
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
      orderBy: {
        order: "asc",
      },
    });
  }

  @Authorized()
  @Mutation(() => ChapterMutationResponse)
  async createChapter(
    @Args()
    { bookId, order, ...args }: CreateChapterArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<ChapterMutationResponse> {
    handleValidationError(
      createChapterSchema.safeParse({
        ...args,
      }),
    );

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
      return throwForbiddenError();
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
        order,
        ...args,
      },
    });

    return {
      success: true,
      message: "Đã thêm chương mới",
      chapter,
    };
  }

  @Authorized()
  @Mutation(() => ChapterMutationResponse)
  async updateChapter(
    @Args() { chapterId, bookId, ...args }: UpdateChapterArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<ChapterMutationResponse> {
    handleValidationError(
      createChapterSchema.safeParse({
        ...args,
      }),
    );

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { createdById: true },
    });

    if (!book || book.createdById !== user!.id) {
      return throwForbiddenError();
    }

    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: { ...args },
    });

    return {
      success: true,
      message: "Đã cập nhật chương",
      chapter: updatedChapter,
    };
  }

  @Authorized()
  @Mutation(() => MutationResponse)
  async deleteChapter(
    @Arg("chapterId", () => Int) chapterId: number,
    @Ctx() { prisma, user }: Context,
  ): Promise<MutationResponse> {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: {
        id: true,
        book: {
          select: {
            createdById: true,
          },
        },
      },
    });

    if (!chapter || chapter.book.createdById !== user!.id) {
      return throwForbiddenError();
    }

    await prisma.chapter.delete({
      where: { id: chapter.id },
    });

    return {
      success: true,
      message: "Chương đã xóa",
    };
  }

  @Authorized()
  @Mutation(() => [Chapter])
  async swapChapters(
    @Args()
    { bookId, data }: SwapChaptersArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<Chapter[]> {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.createdById !== user!.id) {
      return throwForbiddenError();
    }

    try {
      await prisma.$transaction(
        data.map((chapter) =>
          prisma.chapter.update({
            where: { bookId, id: chapter.id },
            data: { order: chapter.newOrder },
          }),
        ),
      );

      return await prisma.chapter.findMany({
        where: { id: { in: [...data.map((chapter) => chapter.id)] } },
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
        orderBy: { order: "asc" },
      });
    } catch (error) {
      throw new Error("Không thể trao đổi chương. Vui lòng thử lại sau.");
    }
  }
}
