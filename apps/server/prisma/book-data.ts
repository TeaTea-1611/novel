import { PrismaClient } from "@prisma/client";
import { fakerVI } from "@faker-js/faker";
import argon2 from "argon2";

const prisma = new PrismaClient();

const password = "Tl161102@";

async function generateBookStatistics() {
  const hashPassword = await argon2.hash(password);

  await prisma.user.upsert({
    where: { email: "phamnam.dev@gmail.com" },
    update: { password: hashPassword },
    create: {
      email: "phamnam.dev@gmail.com",
      nickname: "test_account",
      emailVerified: new Date(),
      password: hashPassword,
      notificationSettings: {
        create: {
          newChapter: true,
          newInteraction: true,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { email: "phamnam.dev@gmail.com" },
  });

  const genres = await prisma.genre.findMany({ select: { id: true } });
  const tags = await prisma.tag.findMany({ select: { id: true } });

  const chunkSize = 5;
  const baseDate = new Date();
  baseDate.setMonth(baseDate.getMonth() - Math.floor(Math.random() * 2) - 1);

  for (let i = 0; i < chunkSize; i++) {
    const randomGenreId = genres[Math.floor(Math.random() * genres.length)].id;
    const randomTagIds = tags
      .map((tag) => tag.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const name = fakerVI.word.words(10);
    const synopsis = [...Array(10)]
      .map(() => fakerVI.lorem.paragraphs(3))
      .join("\n\n");

    // Tạo sách vào ngày base
    const bookCreatedDate = new Date(baseDate);
    bookCreatedDate.setDate(
      baseDate.getDate() + Math.floor(Math.random() * 30),
    );

    const book = await prisma.book.create({
      data: {
        createdAt: bookCreatedDate,
        createdById: user!.id,
        genreId: randomGenreId,
        gender: 1,
        kind: 2,
        name,
        synopsis,
        tagOnBooks: {
          create: randomTagIds.map((id) => ({ tag: { connect: { id } } })),
        },
      },
    });

    let totalRead = 0;

    const chapterPromises = [...Array(10)].map(async (_, j) => {
      const chapterCreatedDate = new Date(bookCreatedDate);

      return prisma.chapter.create({
        data: {
          bookId: book.id,
          createdAt: chapterCreatedDate,
          title: fakerVI.word.words(8),
          content: [...Array(10)]
            .map(() => fakerVI.lorem.paragraphs(3))
            .join("\n\n"),
          order: j + 1,
          unlockPrice: fakerVI.number.int({ min: 0, max: 50, multipleOf: 10 }),
        },
      });
    });

    await Promise.all(chapterPromises);

    // Tạo bookStatistic từ ngày tạo sách đến hiện tại
    const currentDate = new Date();
    let statisticDate = new Date(bookCreatedDate);

    while (statisticDate <= currentDate) {
      const chapters = await prisma.chapter.findMany({
        where: { bookId: book.id },
        select: { id: true },
      });

      let totalDailyRead = 0;

      for (let j = 0; j < chapters.length; j++) {
        const readCnt = fakerVI.number.int({ min: 0, max: 1000 });
        totalDailyRead += readCnt;
        totalRead += readCnt;
        await prisma.chapterStatistic.create({
          data: {
            chapterId: chapters[j].id,
            date: statisticDate,
            read: readCnt,
          },
        });
      }

      await prisma.bookStatistic.create({
        data: {
          date: statisticDate,
          bookId: book.id,
          read: totalDailyRead,
        },
      });

      statisticDate.setDate(statisticDate.getDate() + 1);
    }

    await prisma.book.update({
      where: { id: book.id },
      data: {
        readCnt: totalRead,
      },
    });
  }
}

generateBookStatistics()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
