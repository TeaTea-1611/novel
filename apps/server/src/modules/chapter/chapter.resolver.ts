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
import { ChapterMutationResponse } from "./chapter.type";
import { MutationResponse } from "../../types";
import { Book, Chapter } from "../../../prisma/generated/type-graphql";
import {
  CreateChapterArgs,
  SwapChaptersArgs,
  UpdateChapterArgs,
} from "./chapter.arg";
import { handleValidationError } from "../../validation/handle-error";
import { createChapterSchema } from "./chapter.validation";
import { forbiddenError } from "../../shared/utils/errors";

const MAX_DELETE_LIMIT = 20;

@Service()
@Resolver(() => Chapter)
export class ChapterResolver {
  @FieldResolver(() => String)
  content(@Root() chapter: Chapter, @Ctx() {}: Context) {
    // TODO
    return chapter.content;
  }

  @FieldResolver(() => Book, { nullable: true })
  async book(
    @Root() chapter: Chapter,
    @Ctx() { prisma }: Context,
  ): Promise<Book | null> {
    return await prisma.book.findUnique({ where: { id: chapter.bookId } });
  }

  @Query(() => Chapter, { nullable: true })
  async chapterById(
    @Arg("chapterId", () => Int) chapterId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Chapter | null> {
    return await prisma.chapter.findUnique({
      where: { id: chapterId },
    });
  }

  @Query(() => Chapter, { nullable: true })
  async chapterByBookAndOrder(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("order", () => Int) order: number,
    @Ctx() { prisma }: Context,
  ): Promise<Chapter | null> {
    return await prisma.chapter.findFirst({
      where: { bookId, order },
    });
  }

  @Query(() => [Chapter])
  async chapters(
    @Arg("bookId", () => Int) bookId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Chapter[]> {
    return await prisma.chapter.findMany({
      where: { bookId },
      omit: { content: true },
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
      throw forbiddenError();
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
      throw forbiddenError();
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
  async deleteChapters(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("chapterIds", () => [Int]) chapterIds: number[],
    @Ctx() { prisma, user }: Context,
  ): Promise<MutationResponse> {
    if (chapterIds.length === 0) {
      return {
        success: true,
        message: "Thành công",
      };
    }

    if (chapterIds.length > MAX_DELETE_LIMIT) {
      return {
        success: false,
        message: `Bạn chỉ có thể xóa tối đa ${MAX_DELETE_LIMIT} chương cùng lúc`,
      };
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!book || book.createdById !== user!.id) {
      throw forbiddenError();
    }

    // Lấy danh sách thứ tự của các chương sẽ bị xóa
    const deletedChapters = await prisma.chapter.findMany({
      where: { id: { in: chapterIds }, bookId: book.id },
      select: { order: true },
    });

    if (deletedChapters.length === 0) {
      return {
        success: false,
        message: "Không tìm thấy chương để xóa",
      };
    }
    // Tổng chương [1,2,3,4,5,6,7,8]
    // Chương xóa [7,3,2,5] => [2,3,5,7]
    // Sắp xếp thứ tự các chương bị xóa theo `order`
    const deletedOrders = deletedChapters
      .map((c) => c.order)
      .sort((a, b) => a - b);

    await prisma.$transaction(async (tx) => {
      await tx.chapter.deleteMany({
        where: { id: { in: chapterIds }, bookId: book.id },
      });

      for (let i = 0; i < deletedOrders.length; i++) {
        const currentOrder = deletedOrders[i];

        // i = 0, currentOrder = 2
        // chapter: 3 - 1, 4 - 1, 5 - 1, 6 - 1, 7 - 1, 8 - 1
        // i = 1, currentOrder = 3
        // chapter: 4 - 1, 4 - 1, 5 - 1, 6 - 1, 7 - 1, 8 - 1
        // i = 2, currentOrder = 5
        // chapter: 6 - 1, 7 - 1, 8 - 1
        // i = 3, currentOrder = 7
        // chapter: 8 - 1

        await tx.chapter.updateMany({
          where: {
            bookId: book.id,
            order: { gt: currentOrder - i }, // Giảm `order` theo số lượng chương đã xóa trước đó
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        });
      }
    });

    return {
      success: true,
      message: `Đã xóa ${chapterIds.length} chương`,
    };
  }

  @Authorized()
  @Mutation(() => MutationResponse)
  async updateChapters(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("chapterIds", () => [Int]) chapterIds: number[],
    @Arg("unlockPrice", () => Int) unlockPrice: number,
    @Arg("publishAt", () => Date) publishAt: Date,
    @Ctx() { prisma, user }: Context,
  ): Promise<MutationResponse> {
    if (chapterIds.length === 0) {
      return {
        success: true,
        message: "Thành công",
      };
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!book || book.createdById !== user!.id) {
      throw forbiddenError();
    }

    await prisma.chapter.updateMany({
      where: { bookId: book.id, id: { in: chapterIds } },
      data: {
        unlockPrice,
        publishAt,
      },
    });

    return {
      success: true,
      message: `Đã cập nhật ${chapterIds.length} chương`,
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
      throw forbiddenError();
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
        omit: { content: true },
        orderBy: { order: "asc" },
      });
    } catch (error) {
      throw new Error("Không thể trao đổi chương. Vui lòng thử lại sau.");
    }
  }
}
