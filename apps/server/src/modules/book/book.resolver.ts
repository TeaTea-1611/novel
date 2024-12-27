import type { Prisma } from "@prisma/client";
import { createWriteStream, promises as fsPromises } from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
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
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import {
  Author,
  Book,
  Genre,
  Reading,
  Tag,
  User,
} from "../../../prisma/generated/type-graphql";
import type { Context } from "../../context";
import { env } from "../../env";
import { createBookSchema, updateBookSchema } from "./book.validation";
import { MutationResponse, type Upload } from "../../types";
import { forbiddenError } from "../../shared/utils/errors";
import {
  ConvertBookArgs,
  CreateBookArgs,
  PaginatedBooksArgs,
  PaginatedRankingBooksArgs,
  UpdateBookArgs,
  UpdateConvertBookArgs,
} from "./book.arg";
import { BookResponse, PaginatedBooksResponse } from "./book.type";
import { handleValidationError } from "../../validation/handle-error";

@Service()
@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Int])
  kinds(): number[] {
    return [1, 2];
  }

  @Query(() => [Int])
  genders(): number[] {
    return [1, 2];
  }

  @Query(() => [Int])
  status(): number[] {
    return [1, 2, 3];
  }

  @FieldResolver(() => User)
  async createdBy(
    @Root() book: Book,
    @Ctx() { dataLoaders: { userLoader } }: Context,
  ) {
    return userLoader.load(book.createdById);
  }

  @FieldResolver(() => Genre)
  async genre(
    @Root() book: Book,
    @Ctx() { dataLoaders: { genreLoader } }: Context,
  ) {
    return genreLoader.load(book.genreId);
  }

  @FieldResolver(() => [Tag])
  async tags(
    @Root() book: Book,
    @Ctx() { dataLoaders: { tagOnBookLoader } }: Context,
  ) {
    return tagOnBookLoader.load(book.id);
  }

  @FieldResolver(() => Author, { nullable: true })
  async author(@Root() book: Book, @Ctx() { prisma }: Context) {
    return book.kind === 1
      ? prisma.book.findUnique({ where: { id: book.id } }).author()
      : null;
  }

  @FieldResolver(() => Int, { nullable: true })
  readMonthly(@Root() book: Book & { readMonthly?: number }) {
    return book?.readMonthly ?? null;
  }

  @FieldResolver(() => Int, { nullable: true })
  nominateMonthly(@Root() book: Book & { nominateMonthly?: number }) {
    return book?.nominateMonthly ?? null;
  }

  // @UseMiddleware(UserMiddleware)
  @FieldResolver(() => Reading, { nullable: true })
  async reading(
    @Root() book: Book,
    @Ctx() { user, prisma }: Context,
  ): Promise<Reading | null> {
    if (!user) return null;

    return await prisma.reading.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: book.id,
        },
      },
    });
  }

  @Authorized()
  @Mutation(() => BookResponse)
  async createBook(
    @Args()
    { name, synopsis, gender, genreId, tagIds }: CreateBookArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<BookResponse> {
    handleValidationError(
      createBookSchema.safeParse({
        name,
        synopsis,
        gender,
        genreId,
        tagIds,
      }),
    );

    const existingBook = await prisma.book.findUnique({
      where: { name },
    });

    if (existingBook) {
      return {
        success: false,
        message: "Tên truyện đã tồn tại.",
      };
    }

    const book = await prisma.book.create({
      data: {
        kind: 2,
        name,
        gender,
        synopsis,
        createdBy: { connect: { id: user!.id } },
        genre: { connect: { id: genreId } },
        tagOnBooks: {
          create: tagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });

    return {
      success: true,
      message: "Thêm mới thành công.",
      book,
    };
  }

  @Authorized()
  @Mutation(() => BookResponse)
  async updateBook(
    @Args()
    { bookId, genreId, tagIds, ...args }: UpdateBookArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<BookResponse> {
    handleValidationError(
      updateBookSchema.safeParse({
        ...args,
        genreId,
        tagIds,
      }),
    );

    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        createdById: user!.id,
      },
      select: { id: true },
    });

    if (!existingBook) {
      return {
        success: false,
        message: "Truyện không tồn tại hoặc bạn không có quyền chỉnh sửa.",
        book: null,
      };
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        ...args,
        ...(genreId ? { genre: { connect: { id: genreId } } } : {}),
        ...(tagIds?.length
          ? {
              tagOnBooks: {
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
      book: updatedBook,
    };
  }

  @Authorized()
  @Mutation(() => BookResponse)
  async convertBook(
    @Args()
    {
      name,
      originalName,
      authorName,
      originalAuthorName,
      synopsis,
      gender,
      genreId,
      tagIds,
    }: ConvertBookArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<BookResponse> {
    const existingBook = await prisma.book.findUnique({
      where: { name },
    });

    if (existingBook) {
      return {
        success: false,
        message: "Tên truyện đã tồn tại.",
        book: null,
      };
    }

    const book = await prisma.book.create({
      data: {
        kind: 1,
        name,
        originalName,
        author: {
          connectOrCreate: {
            where: {
              name_originalName: {
                name: authorName,
                originalName: originalAuthorName,
              },
            },
            create: { name: authorName, originalName: originalAuthorName },
          },
        },
        gender,
        synopsis,
        createdBy: { connect: { id: user!.id } },
        genre: { connect: { id: genreId } },
        tagOnBooks: {
          create: tagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });

    return {
      success: true,
      message: "Thêm mới thành công.",
      book,
    };
  }

  @Authorized()
  @Mutation(() => BookResponse)
  async updateConvertBook(
    @Args()
    {
      id,
      name,
      synopsis,
      gender,
      genreId,
      tagIds,
      authorName,
      originalAuthorName,
      originalName,
    }: UpdateConvertBookArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<BookResponse> {
    const existingBook = await prisma.book.findFirst({
      where: {
        id,
        createdById: user!.id,
      },
      select: { id: true },
    });

    if (!existingBook) {
      return {
        success: false,
        message: "Truyện không tồn tại hoặc bạn không có quyền chỉnh sửa.",
        book: null,
      };
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        name,
        originalName,
        synopsis,
        author: {
          connectOrCreate: {
            where: {
              name_originalName: {
                name: authorName,
                originalName: originalAuthorName,
              },
            },
            create: { name: authorName, originalName: originalAuthorName },
          },
        },
        gender,
        genre: { connect: { id: genreId } },
        tagOnBooks: {
          deleteMany: {},
          create: tagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });

    return {
      success: true,
      message: "Cập nhật thành công.",
      book: updatedBook,
    };
  }

  @Query(() => Book, { nullable: true })
  async book(
    @Arg("bookId", () => Int) bookId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Book | null> {
    return await prisma.book.findUnique({ where: { id: bookId } });
  }

  @Query(() => PaginatedBooksResponse)
  async paginatedBooks(
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
    }: PaginatedBooksArgs,
    @Ctx() { prisma }: Context,
  ): Promise<PaginatedBooksResponse> {
    const realTake = Math.min(take, 50);

    const whereClause: Prisma.BookWhereInput = {
      OR: [
        { name: { contains: keyword, mode: "insensitive" } },
        { author: { name: { contains: keyword, mode: "insensitive" } } },
        { createdBy: { nickname: { contains: keyword, mode: "insensitive" } } },
      ],
      ...(gender && { gender }),
      ...(genreId && { genreId }),
      ...(tagIds?.length && {
        tagOnBooks: { some: { tagId: { in: tagIds } } },
      }),
    };

    const [total, books] = await Promise.all([
      prisma.book.count({ where: whereClause }),
      prisma.book.findMany({
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
      books,
      prev,
      next,
      totalPages,
    };
  }

  @Query(() => PaginatedBooksResponse)
  async paginatedRankingBooks(
    @Args()
    { page, take, type, month, year }: PaginatedRankingBooksArgs,
    @Ctx() { prisma }: Context,
  ): Promise<PaginatedBooksResponse> {
    const realTake = Math.min(take, 50);
    const currentPage = Math.max(page, 1);

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const bookRankings = await prisma.bookStatistic.groupBy({
      by: ["bookId"],
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

    const [total, books] = await Promise.all([
      await prisma.bookStatistic
        .groupBy({
          by: ["bookId"],
          where: {
            date: {
              gte: startDate,
              lt: endDate,
            },
          },
          _count: {
            bookId: true,
          },
        })
        .then((result) => result.length),
      await prisma.book.findMany({
        where: {
          id: { in: bookRankings.map((ranking) => ranking.bookId) },
        },
      }),
    ]);

    const booksWithMonthlyTotal = books
      .map((book) => {
        const ranking = bookRankings.find((r) => r.bookId === book.id);
        return {
          ...book,
          [`${type}Monthly`]: ranking?._sum[type] ?? 0,
        };
      })
      .sort((a: any, b: any) => b[`${type}Monthly`] - a[`${type}Monthly`]);

    const totalPages = Math.ceil(total / realTake);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      total,
      books: booksWithMonthlyTotal,
      prev,
      next,
      totalPages,
    };
  }

  @Authorized()
  @Query(() => PaginatedBooksResponse)
  async createdBooks(
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
    }: PaginatedBooksArgs,
    @Ctx() { prisma, user }: Context,
  ): Promise<PaginatedBooksResponse> {
    const realTake = Math.min(take, 50);

    const whereClause: Prisma.BookWhereInput = {
      createdById: user!.id,
      OR: [
        { name: { contains: keyword, mode: "insensitive" } },
        { author: { name: { contains: keyword, mode: "insensitive" } } },
        { createdBy: { nickname: { contains: keyword, mode: "insensitive" } } },
      ],
      ...(gender && { gender }),
      ...(genreId && { genreId }),
      ...(tagIds?.length && {
        tagOnBooks: {
          some: {
            tagId: { in: tagIds },
          },
        },
      }),
    };

    const [total, books] = await Promise.all([
      prisma.book.count({ where: whereClause }),
      prisma.book.findMany({
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
      books,
      prev,
      next,
      totalPages,
    };
  }

  @Authorized()
  @Mutation(() => Book)
  async changePoster(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("poster", () => GraphQLUpload) { createReadStream }: Upload,
    @Ctx() { user, prisma }: Context,
  ): Promise<Book> {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.createdById !== user!.id) {
      throw forbiddenError();
    }

    const uploadDir = path.join(import.meta.dir, "../../../public/upload/book");
    await fsPromises.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${bookId}.jpg`);

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
    const poster = `${protocol}://${env.HOST}:${
      env.PORT
    }/upload/book/${bookId}.jpg?${Date.now()}`;

    return await prisma.book.update({
      where: { id: bookId },
      data: {
        poster,
      },
    });
  }

  @Authorized()
  @Mutation(() => MutationResponse)
  async deleteBook(
    @Arg("bookId", () => Int) bookId: number,
    @Ctx() { user, prisma }: Context,
  ): Promise<MutationResponse> {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return {
        success: false,
        message: "Không tìm thấy truyện",
      };
    }

    if (book.createdById !== user!.id) {
      throw forbiddenError();
    }

    await prisma.book.delete({
      where: { id: book.id },
    });

    return {
      success: true,
      message: "Truyện đã xóa",
    };
  }
}
