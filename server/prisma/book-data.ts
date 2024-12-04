import { PrismaClient } from "@prisma/client";
import { fakerVI } from "@faker-js/faker";
import argon2 from "argon2";

const prisma = new PrismaClient();

const password = "Tl161102@";

async function generateBookStatistics() {
  // Tạo user test
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

  const chunkSize = 1;
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

    let totalReadCnt = 0;
    const chapterPromises = [...Array(10)].map(async (_, j) => {
      const chapterCreatedDate = new Date(bookCreatedDate);
      chapterCreatedDate.setDate(bookCreatedDate.getDate() + j);

      const chapterReadCnt = fakerVI.number.int({ min: 0, max: 1000 });
      totalReadCnt += chapterReadCnt;

      return prisma.chapter.create({
        data: {
          bookId: book.id,
          createdAt: chapterCreatedDate,
          title: fakerVI.word.words(8),
          content: [...Array(10)]
            .map(() => fakerVI.lorem.paragraphs(3))
            .join("\n\n"),
          order: j + 1,
          unlockPrice: fakerVI.number.int({ min: 0, max: 50 }),
          readCnt: chapterReadCnt,
        },
      });
    });

    await Promise.all(chapterPromises);

    // Cập nhật tổng số lượt đọc cho sách
    await prisma.book.update({
      where: { id: book.id },
      data: { readCnt: totalReadCnt },
    });

    // Tạo bookStatistic từ ngày tạo sách đến hiện tại
    const currentDate = new Date();
    let statisticDate = new Date(bookCreatedDate);

    while (statisticDate <= currentDate) {
      // Tính toán số ngày còn lại để phân bổ
      const totalRemainingDays =
        Math.ceil(
          (currentDate.getTime() - statisticDate.getTime()) /
            (24 * 60 * 60 * 1000),
        ) + 1;

      // Kiểm tra tổng giá trị đã được phân bổ trước đó
      const previousTotalValue =
        (
          await prisma.bookStatistic.aggregate({
            where: {
              bookId: book.id,
              date: { lt: statisticDate },
            },
            _sum: { read: true },
          })
        )._sum.read || 0;

      // Tính toán số lượt đọc còn lại
      const remainingReads = totalReadCnt - previousTotalValue;

      // Phân bổ trung bình với một chút ngẫu nhiên
      if (remainingReads > 0) {
        const averageDailyValue = Math.floor(
          remainingReads / totalRemainingDays,
        );
        const dailyVariation = Math.floor(averageDailyValue * 0.3); // Cho phép dao động 30%

        const dailyValue = Math.min(
          Math.max(
            Math.floor(
              averageDailyValue + (Math.random() * 2 - 1) * dailyVariation,
            ),
            0,
          ),
          remainingReads,
        );

        await prisma.bookStatistic.create({
          data: {
            date: statisticDate,
            bookId: book.id,
            read: dailyValue,
          },
        });
      }

      // Tăng ngày
      statisticDate.setDate(statisticDate.getDate() + 1);
    }
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
