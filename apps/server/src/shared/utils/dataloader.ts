import { PrismaClient, type Tag } from "@workspace/db";
import DataLoader from "dataloader";

const createUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (userIds: readonly number[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...userIds] } },
    });
    return userIds.map((userId) => users.find((user) => user.id === userId));
  });
};

const createNovelLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (novelIds: readonly number[]) => {
    const novels = await prisma.novel.findMany({
      where: { id: { in: [...novelIds] } },
    });
    return novelIds.map((NovelId) =>
      novels.find((Novel) => Novel.id === NovelId),
    );
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

const createTagOnNovelLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (novelIds: readonly number[]) => {
    const tagOnNovels = await prisma.novelTag.findMany({
      where: { novelId: { in: novelIds as number[] } },
      include: { tag: true },
    });

    const tagsMap = tagOnNovels.reduce<Record<number, Tag[]>>(
      (acc, tagOnNovel) => {
        if (!acc[tagOnNovel.novelId]) {
          acc[tagOnNovel.novelId] = [];
        }
        acc[tagOnNovel.novelId].push(tagOnNovel.tag);
        return acc;
      },
      {},
    );

    return novelIds.map((novelId) => tagsMap[novelId] || []);
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
  NovelLoader: createNovelLoader(prisma),
  authorLoader: createAuthorLoader(prisma),
  genreLoader: createGenreLoader(prisma),
  tagOnNovelLoader: createTagOnNovelLoader(prisma),
  tagGroupLoader: createTagGroupLoader(prisma),
});
