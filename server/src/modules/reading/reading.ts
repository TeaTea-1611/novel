import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../../context";
import { Book, Reading } from "../../generated/type-graphql";
import { PaginatedReading } from "./types";

@Service()
@Resolver(() => Reading)
export class ReadingResolver {
  @FieldResolver(() => Book)
  async book(@Root() root: Reading, @Ctx() { prisma }: Context) {
    return await prisma.book.findUnique({
      where: { id: root.bookId },
    });
  }

  @Authorized()
  @Query(() => PaginatedReading)
  async reading(
    @Ctx() { prisma, user }: Context,
    @Arg("take", () => Int) take: number,
    @Arg("cursor", { nullable: true }) cursor?: string,
  ): Promise<PaginatedReading> {
    const realTake = Math.min(10, take);

    const totalCount = await prisma.reading.count({
      where: { userId: user!.id },
    });

    const data = await prisma.reading.findMany({
      where: {
        userId: user!.id,
        ...(cursor && { readingAt: { lt: cursor } }),
      },
      take: realTake,
      orderBy: {
        readingAt: "desc",
      },
    });

    const hasMore =
      data.length === realTake &&
      data[data.length - 1].readingAt.toString() !== cursor;

    return {
      totalCount,
      cursor: data.length ? data[data.length - 1].readingAt : null,
      reading: data,
      hasMore,
    };
  }
}
