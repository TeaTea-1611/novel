import { type Prisma } from "@prisma/client";
import { createWriteStream, promises as fsPromises } from "fs";
import { GraphQLUpload } from "graphql-upload-ts";
import * as path from "path";
import sharp from "sharp";
import { finished } from "stream/promises";
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
import { env } from "../../env";
import { forbiddenError } from "../../shared/utils/errors";
import { MutationResponse, type Upload } from "../../types";
import { handleValidationError } from "../../validation/handle-error";
import { Author } from "../author/author.model";
import { Genre } from "../genre/genre.model";
import { Tag } from "../tag/tag.model";
import { User } from "../user/user.model";
import {
  CreateNovelArgs,
  PaginatedNovelsArgs,
  PaginatedRankingNovelsArgs,
  UpdateNovelArgs,
} from "./novel.arg";
import { Novel } from "./novel.model";
import { NovelResponse, PaginatedNovelsResponse } from "./novel.type";
import { createNovelSchema, updateNovelSchema } from "./novel.validation";
import { NovelType } from "./novel.enum";

@Service()
@Resolver(() => Novel)
export class NovelResolver {
  @FieldResolver(() => User)
  async createdBy(
    @Root() Novel: Novel,
    @Ctx() { dataLoaders: { userLoader } }: Context,
  ) {
    return userLoader.load(Novel.createdById);
  }

  @FieldResolver(() => Genre)
  async genre(
    @Root() Novel: Novel,
    @Ctx() { dataLoaders: { genreLoader } }: Context,
  ) {
    return genreLoader.load(Novel.genreId);
  }

  @FieldResolver(() => [Tag])
  async tags(
    @Root() Novel: Novel,
    @Ctx() { dataLoaders: { tagOnNovelLoader } }: Context,
  ) {
    return tagOnNovelLoader.load(Novel.id);
  }

  @FieldResolver(() => Author, { nullable: true })
  async author(@Root() novel: Novel, @Ctx() { prisma }: Context) {
    return novel.type === NovelType.TRANSLATION
      ? prisma.novel.findUnique({ where: { id: novel.id } }).author()
      : null;
  }

  @FieldResolver(() => Int, { nullable: true })
  readMonthly(@Root() Novel: Novel & { readMonthly?: number }) {
    return Novel?.readMonthly ?? null;
  }

  @FieldResolver(() => Int, { nullable: true })
  nominateMonthly(@Root() Novel: Novel & { nominateMonthly?: number }) {
    return Novel?.nominateMonthly ?? null;
  }

  // // @UseMiddleware(UserMiddleware)
  // @FieldResolver(() => Reading, { nullable: true })
  // async reading(
  //   @Root() Novel: Novel,
  //   @Ctx() { user, prisma }: Context
  // ): Promise<Reading | null> {
  //   if (!user) return null;

  //   return await prisma.reading.findUnique({
  //     where: {
  //       userId_NovelId: {
  //         userId: user.id,
  //         NovelId: Novel.id,
  //       },
  //     },
  //   });
  // }

  @Authorized()
  @Mutation(() => NovelResponse)
  async createNovel(
    @Args()
    { title, synopsis, gender, genreId, tagIds }: CreateNovelArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<NovelResponse> {
    handleValidationError(
      createNovelSchema.safeParse({
        title,
        synopsis,
        gender,
        genreId,
        tagIds,
      }),
    );

    const existing = await prisma.novel.findUnique({
      where: { title },
    });

    if (existing) {
      return {
        success: false,
        message: "Tên truyện đã tồn tại.",
      };
    }

    const novel = await prisma.novel.create({
      data: {
        title,
        gender,
        synopsis,
        coverImage: "",
        type: NovelType.ORIGINAL,
        createdBy: { connect: { id: user!.id } },
        genre: { connect: { id: genreId } },
        novelTags: {
          create: tagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });

    return {
      success: true,
      message: "Thêm mới thành công.",
      novel,
    };
  }

  @Authorized()
  @Mutation(() => NovelResponse)
  async updateNovel(
    @Args()
    { novelId, genreId, tagIds, ...args }: UpdateNovelArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<NovelResponse> {
    handleValidationError(
      updateNovelSchema.safeParse({
        ...args,
        genreId,
        tagIds,
      }),
    );

    const existing = await prisma.novel.findFirst({
      where: {
        id: novelId,
        createdById: user!.id,
      },
      select: { id: true },
    });

    if (!existing) {
      return {
        success: false,
        message: "Truyện không tồn tại hoặc bạn không có quyền chỉnh sửa.",
      };
    }

    const updated = await prisma.novel.update({
      where: { id: novelId },
      data: {
        ...args,
        ...(genreId ? { genre: { connect: { id: genreId } } } : {}),
        ...(tagIds?.length
          ? {
              tagOnNovels: {
                deleteMany: {},
                create: tagIds.map((id) => ({ tag: { connect: { id } } })),
              },
            }
          : {}),
      },
    });

    return {
      success: true,
      message: "Cập nhật thành công.",
      novel: updated,
    };
  }

  // @Authorized()
  // @Mutation(() => NovelResponse)
  // async convertNovel(
  //   @Args()
  //   {
  //     name,
  //     originalName,
  //     authorName,
  //     originalAuthorName,
  //     synopsis,
  //     gender,
  //     genreId,
  //     tagIds,
  //   }: ConvertNovelArgs,
  //   @Ctx() { user, prisma }: Context,
  // ): Promise<NovelResponse> {
  //   const existingNovel = await prisma.Novel.findUnique({
  //     where: { name },
  //   });

  //   if (existingNovel) {
  //     return {
  //       success: false,
  //       message: "Tên truyện đã tồn tại.",
  //       Novel: null,
  //     };
  //   }

  //   const Novel = await prisma.Novel.create({
  //     data: {
  //       kind: 1,
  //       name,
  //       originalName,
  //       author: {
  //         connectOrCreate: {
  //           where: {
  //             name_originalName: {
  //               name: authorName,
  //               originalName: originalAuthorName,
  //             },
  //           },
  //           create: { name: authorName, originalName: originalAuthorName },
  //         },
  //       },
  //       gender,
  //       synopsis,
  //       createdBy: { connect: { id: user!.id } },
  //       genre: { connect: { id: genreId } },
  //       tagOnNovels: {
  //         create: tagIds.map((id) => ({ tag: { connect: { id } } })),
  //       },
  //     },
  //   });

  //   return {
  //     success: true,
  //     message: "Thêm mới thành công.",
  //     Novel,
  //   };
  // }

  // @Authorized()
  // @Mutation(() => NovelResponse)
  // async updateConvertNovel(
  //   @Args()
  //   {
  //     id,
  //     name,
  //     synopsis,
  //     gender,
  //     genreId,
  //     tagIds,
  //     authorName,
  //     originalAuthorName,
  //     originalName,
  //   }: UpdateConvertNovelArgs,
  //   @Ctx() { user, prisma }: Context,
  // ): Promise<NovelResponse> {
  //   const existingNovel = await prisma.Novel.findFirst({
  //     where: {
  //       id,
  //       createdById: user!.id,
  //     },
  //     select: { id: true },
  //   });

  //   if (!existingNovel) {
  //     return {
  //       success: false,
  //       message: "Truyện không tồn tại hoặc bạn không có quyền chỉnh sửa.",
  //       Novel: null,
  //     };
  //   }

  //   const updatedNovel = await prisma.Novel.update({
  //     where: { id },
  //     data: {
  //       name,
  //       originalName,
  //       synopsis,
  //       author: {
  //         connectOrCreate: {
  //           where: {
  //             name_originalName: {
  //               name: authorName,
  //               originalName: originalAuthorName,
  //             },
  //           },
  //           create: { name: authorName, originalName: originalAuthorName },
  //         },
  //       },
  //       gender,
  //       genre: { connect: { id: genreId } },
  //       tagOnNovels: {
  //         deleteMany: {},
  //         create: tagIds.map((id) => ({ tag: { connect: { id } } })),
  //       },
  //     },
  //   });

  //   return {
  //     success: true,
  //     message: "Cập nhật thành công.",
  //     Novel: updatedNovel,
  //   };
  // }

  @Query(() => Novel, { nullable: true })
  async novel(
    @Arg("novelId", () => Int) novelId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Novel | null> {
    return await prisma.novel.findUnique({ where: { id: novelId } });
  }

  @Query(() => PaginatedNovelsResponse)
  async paginatedNovels(
    @Args()
    {
      page,
      take,
      keyword,
      gender,
      genreId,
      tagIds,
      sortBy,
      sortOrder,
    }: PaginatedNovelsArgs,
    @Ctx() { prisma }: Context,
  ): Promise<PaginatedNovelsResponse> {
    const realTake = Math.min(take, 50);

    const whereClause: Prisma.NovelWhereInput = {
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { author: { name: { contains: keyword, mode: "insensitive" } } },
        { createdBy: { nickname: { contains: keyword, mode: "insensitive" } } },
      ],
      ...(gender && { gender }),
      ...(genreId && { genreId }),
      ...(tagIds?.length && {
        tagOnNovels: { some: { tagId: { in: tagIds } } },
      }),
    };

    const [total, novels] = await Promise.all([
      prisma.novel.count({ where: whereClause }),
      prisma.novel.findMany({
        where: whereClause,
        take: realTake,
        skip: (page - 1) * realTake,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(total / realTake);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      total,
      novels,
      prev,
      next,
      totalPages,
    };
  }

  @Query(() => PaginatedNovelsResponse)
  async paginatedRankingNovels(
    @Args()
    { page, take, type, month, year }: PaginatedRankingNovelsArgs,
    @Ctx() { prisma }: Context,
  ): Promise<PaginatedNovelsResponse> {
    const realTake = Math.min(take, 50);
    const currentPage = Math.max(page, 1);

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const rankings = await prisma.novelStatistic.groupBy({
      by: ["novelId"],
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: { [type]: true },
      orderBy: {
        _sum: { [type]: "desc" },
      },
      take: realTake,
      skip: (currentPage - 1) * realTake,
    });

    const [total, novels] = await Promise.all([
      await prisma.novelStatistic
        .groupBy({
          by: ["novelId"],
          where: {
            date: {
              gte: startDate,
              lt: endDate,
            },
          },
          _count: {
            novelId: true,
          },
        })
        .then((result) => result.length),
      await prisma.novel.findMany({
        where: {
          id: { in: rankings.map((ranking) => ranking.novelId) },
        },
      }),
    ]);

    const novelsWithMonthlyTotal = novels
      .map((novel) => {
        const ranking = rankings.find((r) => r.novelId === novel.id);
        return {
          ...novel,
          [`${type}Monthly`]: ranking?._sum[type] ?? 0,
        };
      })
      .sort((a: any, b: any) => b[`${type}Monthly`] - a[`${type}Monthly`]);

    const totalPages = Math.ceil(total / realTake);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      total,
      novels: novelsWithMonthlyTotal,
      prev,
      next,
      totalPages,
    };
  }

  @Authorized()
  @Query(() => PaginatedNovelsResponse)
  async myNovels(
    @Args()
    {
      page,
      take,
      keyword,
      gender,
      genreId,
      tagIds,
      sortBy,
      sortOrder,
    }: PaginatedNovelsArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<PaginatedNovelsResponse> {
    const realTake = Math.min(take, 50);

    const whereClause: Prisma.NovelWhereInput = {
      createdById: user!.id,
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { author: { name: { contains: keyword, mode: "insensitive" } } },
        { createdBy: { nickname: { contains: keyword, mode: "insensitive" } } },
      ],
      ...(gender && { gender }),
      ...(genreId && { genreId }),
      ...(tagIds?.length && {
        tagOnNovels: {
          some: {
            tagId: { in: tagIds },
          },
        },
      }),
    };

    const [total, novels] = await Promise.all([
      prisma.novel.count({ where: whereClause }),
      prisma.novel.findMany({
        where: whereClause,
        take: realTake,
        skip: (page - 1) * realTake,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(total / realTake);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      total,
      novels,
      prev,
      next,
      totalPages,
    };
  }

  @Authorized()
  @Mutation(() => Novel)
  async changeCoverImage(
    @Arg("novelId", () => Int) novelId: number,
    @Arg("coverImage", () => GraphQLUpload) { createReadStream }: Upload,
    @Ctx() { user, prisma }: Context,
  ): Promise<Novel> {
    const novel = await prisma.novel.findUnique({
      where: { id: novelId },
    });

    if (!novel || novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    const uploadDir = path.join(
      import.meta.dir,
      "../../../public/upload/novel",
    );
    await fsPromises.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${novelId}.jpg`);

    const stream = createReadStream();
    const out = createWriteStream(filePath);

    try {
      const transform = sharp()
        .resize(176, 240)
        .toFormat("jpg", { quality: 100 });

      stream.pipe(transform).pipe(out);

      await finished(out);
    } catch (error) {
      throw new Error("Có lỗi xảy ra khi xử lý ảnh");
    }

    const protocol = env.NODE_ENV === "production" ? "https" : "http";
    const coverImage = `${protocol}://${env.HOST}:${
      env.PORT
    }/upload/novel/${novelId}.jpg?${Date.now()}`;

    return await prisma.novel.update({
      where: { id: novelId },
      data: {
        coverImage,
      },
    });
  }

  @Authorized()
  @Mutation(() => MutationResponse)
  async deleteNovel(
    @Arg("novelId", () => Int) novelId: number,
    @Ctx() { user, prisma }: Context,
  ): Promise<MutationResponse> {
    const novel = await prisma.novel.findUnique({
      where: { id: novelId },
    });

    if (!novel) {
      return {
        success: false,
        message: "Không tìm thấy truyện",
      };
    }

    if (novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    await prisma.novel.delete({
      where: { id: novelId },
    });

    return {
      success: true,
      message: "Truyện đã xóa",
    };
  }
}
