import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import type { Tag } from "../../prisma/generated/type-graphql";

const createUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (userIds: readonly number[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...userIds] } },
    });
    return userIds.map((userId) => users.find((user) => user.id === userId));
  });
};

const createBookLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (bookIds: readonly number[]) => {
    const books = await prisma.book.findMany({
      where: { id: { in: [...bookIds] } },
    });
    return bookIds.map((bookId) => books.find((book) => book.id === bookId));
  });
};

const createGenreLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (genreIds: readonly number[]) => {
    const genres = await prisma.genre.findMany({
      where: { id: { in: [...genreIds] } },
    });
    return genreIds.map((genreId) =>
      genres.find((genre) => genre.id === genreId),
    );
  });
};

const createTagOnBookLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (bookIds: readonly number[]) => {
    const tagOnBooks = await prisma.tagOnBook.findMany({
      where: { bookId: { in: bookIds as number[] } },
      include: { tag: true },
    });

    const tagsMap = tagOnBooks.reduce<Record<number, Tag[]>>(
      (acc, tagOnBook) => {
        if (!acc[tagOnBook.bookId]) {
          acc[tagOnBook.bookId] = [];
        }
        acc[tagOnBook.bookId].push(tagOnBook.tag);
        return acc;
      },
      {},
    );

    return bookIds.map((bookId) => tagsMap[bookId] || []);
  });
};

const createTagGroupLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (categoryIds: readonly number[]) => {
    const categories = await prisma.tagGroup.findMany({
      where: { id: { in: [...categoryIds] } },
    });
    return categoryIds.map((id) => categories.find((c) => c.id === id));
  });
};

const createAuthorLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (authorIds: readonly number[]) => {
    const authors = await prisma.author.findMany({
      where: { id: { in: [...authorIds] } },
    });
    return authorIds.map((authorId) =>
      authors.find((author) => author.id === authorId),
    );
  });
};

export const buildDataLoaders = (prisma: PrismaClient) => ({
  userLoader: createUserLoader(prisma),
  bookLoader: createBookLoader(prisma),
  authorLoader: createAuthorLoader(prisma),
  genreLoader: createGenreLoader(prisma),
  tagOnBookLoader: createTagOnBookLoader(prisma),
  tagGroupLoader: createTagGroupLoader(prisma),
});
