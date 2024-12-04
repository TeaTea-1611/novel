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
import { Comment } from "../../generated/type-graphql";

@Service()
@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async comments(
    @Arg("bookId", () => Int) bookId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Comment[]> {
    return await prisma.comment.findMany({
      where: { bookId },
    });
  }

  @Authorized()
  @Mutation(() => Comment)
  async comment(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("content", () => String) content: string,
    @Ctx() { prisma, user }: Context,
  ): Promise<Comment> {
    const date = new Date();

    const comment = await prisma.comment.create({
      data: {
        book: { connect: { id: bookId } },
        user: { connect: { id: user!.id } },
        content,
      },
    });

    if (comment) {
      await Promise.all([
        prisma.book.update({
          where: { id: comment.bookId },
          data: { commentCnt: { increment: 1 } },
          select: { id: true },
        }),
        prisma.bookStatistic.upsert({
          where: {
            bookId_date: {
              bookId: comment.bookId,
              date,
            },
          },
          create: {
            bookId: comment.bookId,
            date,
            comment: 1,
          },
          update: { comment: { increment: 1 } },
          select: { id: true },
        }),
      ]);
    }
    return comment;
  }
}
