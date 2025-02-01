import { createNovelSchema, type Prisma } from "@workspace/db";
import { createWriteStream, promises as fsPromises } from "fs";
import { GraphQLError } from "graphql";
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
import { NovelKind } from "./novel.enum";
import { Novel } from "./novel.model";
import { PaginatedNovelsResponse } from "./novel.type";

@Service()
@Resolver(() => Novel)
export class NovelResolver {
  private async ensureUniqueTitleForUpdate(
    prisma: Context["prisma"],
    title: string,
  ) {
    const existing = await prisma.novel.findUnique({
      where: { title },
      select: { id: true },
    });

    if (existing) {
      throw new GraphQLError("Truyện đã tồn tại.");
    }
  }

  @FieldResolver(() => User)
  async createdBy(
    @Root() novel: Novel,
    @Ctx() { dataLoaders: { userLoader } }: Context,
  ) {
    return userLoader.load(novel.createdById);
  }

  @FieldResolver(() => Genre)
  async genre(
    @Root() novel: Novel,
    @Ctx() { dataLoaders: { genreLoader } }: Context,
  ) {
    return genreLoader.load(novel.genreId);
  }

  @FieldResolver(() => [Tag])
  async tags(
    @Root() novel: Novel,
    @Ctx() { dataLoaders: { tagOnNovelLoader } }: Context,
  ) {
    return tagOnNovelLoader.load(novel.id);
  }

  @FieldResolver(() => Author, { nullable: true })
  async author(@Root() novel: Novel, @Ctx() { prisma }: Context) {
    return novel.kind === NovelKind.Translation
      ? prisma.novel.findUnique({ where: { id: novel.id } }).author()
      : null;
  }

  @FieldResolver(() => Int, { nullable: true })
  readMonthly(@Root() novel: Novel & { readMonthly?: number }) {
    return novel?.readMonthly ?? null;
  }

  @FieldResolver(() => Int, { nullable: true })
  nominateMonthly(@Root() novel: Novel & { nominateMonthly?: number }) {
    return novel?.nominateMonthly ?? null;
  }

  @Authorized()
  @Mutation(() => Novel)
  async createNovel(
    @Args()
    args: CreateNovelArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<Novel> {
    handleValidationError(createNovelSchema.safeParse(args));

    const {
      title,
      kind,
      originalTitle,
      authorId,
      synopsis,
      gender,
      genreId,
      status,
      tagIds,
    } = args;

    await this.ensureUniqueTitleForUpdate(prisma, title);

    return await prisma.novel.create({
      data: {
        title,
        kind,
        ...(kind === NovelKind.Translation
          ? { originalTitle, author: { connect: { id: authorId! } } }
          : {}),
        gender,
        synopsis,
        status,
        coverImage: "",
        createdBy: { connect: { id: user!.id } },
        genre: { connect: { id: genreId } },
        novelTags: {
          create: tagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });
  }

  @Authorized()
  @Mutation(() => Novel)
  async updateNovel(
    @Args()
    args: UpdateNovelArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<Novel> {
    handleValidationError(createNovelSchema.safeParse(args));

    const {
      id,
      title,
      kind,
      originalTitle,
      authorId,
      synopsis,
      gender,
      genreId,
      status,
      tagIds,
    } = args;

    const novel = await prisma.novel.findUnique({
      where: { id },
    });

    if (!novel || novel.createdById !== user!.id) {
      throw forbiddenError();
    }

    if (novel.title !== title) {
      await this.ensureUniqueTitleForUpdate(prisma, title);
    }

    return await prisma.novel.update({
      where: {
        id: id,
      },
      data: {
        title,
        kind,
        ...(kind === NovelKind.Translation
          ? { originalTitle, author: { connect: { id: authorId! } } }
          : {}),
        gender,
        synopsis,
        status,
        coverImage: "",
        genre: { connect: { id: genreId } },
        novelTags: {
          deleteMany: {},
          create: tagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });
  }

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
