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
import {
  CreateChapterArgs,
  SwapChaptersArgs,
  UpdateChapterArgs,
} from "./chapter.arg";
import { handleValidationError } from "../../validation/handle-error";
import { forbiddenError } from "../../shared/utils/errors";
import { Chapter } from "./chapter.model";
import { Novel } from "../novel/novel.model";

const MAX_DELETE_LIMIT = 20;

@Service()
@Resolver(() => Chapter)
export class ChapterResolver {
  @FieldResolver(() => String)
  content(@Root() chapter: Chapter, @Ctx() {}: Context) {
    // TODO
    return chapter.content;
  }

  @FieldResolver(() => Novel, { nullable: true })
  async novel(
    @Root() chapter: Chapter,
    @Ctx() { prisma }: Context,
  ): Promise<Novel | null> {
    return await prisma.novel.findUnique({ where: { id: chapter.NovelId } });
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
  async chapterByNovelAndOrder(
    @Arg("novelId", () => Int) novelId: number,
    @Arg("chapterNumber", () => Int) chapterNumber: number,
    @Ctx() { prisma }: Context,
  ): Promise<Chapter | null> {
    return await prisma.chapter.findFirst({
      where: { novelId, chapterNumber },
    });
  }

  @Query(() => [Chapter])
  async chapters(
    @Arg("novelId", () => Int) novelId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Chapter[]> {
    return await prisma.chapter.findMany({
      where: { novelId },
      omit: { content: true },
    });
  }

  @Authorized()
  @Mutation(() => ChapterMutationResponse)
  async createChapter(
    @Args()
    { NovelId, order, ...args }: CreateChapterArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<ChapterMutationResponse> {
    handleValidationError(
      createChapterSchema.safeParse({
        ...args,
      }),
    );

    const Novel = await prisma.Novel.findUnique({
      where: { id: NovelId },
    });

    if (!Novel) {
      return {
        success: false,
        message: "Không tìm thấy truyện.",
      };
    }

    if (Novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    const existingChapter = await prisma.chapter.findFirst({
      where: {
        NovelId: NovelId,
        order: order,
      },
      select: { id: true },
    });

    if (existingChapter) {
      await prisma.chapter.updateMany({
        where: {
          NovelId: NovelId,
          order: { gte: order },
        },
        data: {
          order: { increment: 1 },
        },
      });
    }

    const chapter = await prisma.chapter.create({
      data: {
        NovelId,
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
    @Args() { chapterId, NovelId, ...args }: UpdateChapterArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<ChapterMutationResponse> {
    handleValidationError(
      createChapterSchema.safeParse({
        ...args,
      }),
    );

    const Novel = await prisma.Novel.findUnique({
      where: { id: NovelId },
      select: { createdById: true },
    });

    if (!Novel || Novel.createdById !== user!.id) {
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
    @Arg("NovelId", () => Int) NovelId: number,
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

    const Novel = await prisma.Novel.findUnique({
      where: { id: NovelId },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!Novel || Novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    // Lấy danh sách thứ tự của các chương sẽ bị xóa
    const deletedChapters = await prisma.chapter.findMany({
      where: { id: { in: chapterIds }, NovelId: Novel.id },
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
        where: { id: { in: chapterIds }, NovelId: Novel.id },
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
            NovelId: Novel.id,
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
    @Arg("NovelId", () => Int) NovelId: number,
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

    const Novel = await prisma.Novel.findUnique({
      where: { id: NovelId },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!Novel || Novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    await prisma.chapter.updateMany({
      where: { NovelId: Novel.id, id: { in: chapterIds } },
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
    { NovelId, data }: SwapChaptersArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<Chapter[]> {
    const Novel = await prisma.Novel.findUnique({
      where: { id: NovelId },
    });

    if (!Novel || Novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    try {
      await prisma.$transaction(
        data.map((chapter) =>
          prisma.chapter.update({
            where: { NovelId, id: chapter.id },
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
