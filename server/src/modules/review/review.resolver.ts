import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { Review } from "../../generated/type-graphql";

@Service()
@Resolver(() => Review)
export class ReviewResolver {
  @Query(() => [Review])
  async reviews(
    @Arg("bookId", () => Int) bookId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Review[]> {
    return await prisma.review.findMany({
      where: { bookId },
    });
  }

  @Authorized()
  @Mutation(() => Review)
  async review(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("content", () => String) content: string,
    @Arg("isSpoiler", () => Boolean) isSpoiler: boolean,
    @Arg("point", () => Int) point: number,
    @Ctx() { prisma, user }: Context,
  ): Promise<Review> {
    const date = new Date();

    const review = await prisma.review.create({
      data: {
        book: { connect: { id: bookId } },
        user: { connect: { id: user!.id } },
        content,
        isSpoiler,
        point,
      },
    });

    if (review) {
      await Promise.all([
        prisma.book.update({
          where: { id: review.bookId },
          data: { reviewCnt: { increment: 1 } },
          select: { id: true },
        }),
        prisma.bookStatistic.upsert({
          where: {
            bookId_date: {
              bookId: review.bookId,

              date,
            },
          },
          create: {
            bookId: review.bookId,
            date,
            review: 1,
          },
          update: { review: { increment: 1 } },
          select: { id: true },
        }),
      ]);
    }
    return review;
  }
}
