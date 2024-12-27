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
import { Comment, ReplyComment } from "../../../prisma/generated/type-graphql";
import { PaginatedCommentsResponse } from "./comment.type";
import { GraphQLError } from "graphql";

@Service()
@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => PaginatedCommentsResponse)
  async comments(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("page", () => Int) page: number,
    @Arg("take", () => Int) take: number,
    @Ctx() { prisma }: Context,
  ): Promise<PaginatedCommentsResponse> {
    const realTake = Math.min(take, 20);
    const currentPage = Math.max(page, 1);

    const [total, comments] = await Promise.all([
      await prisma.comment.count({
        where: { bookId },
      }),
      await prisma.comment.findMany({
        where: { bookId },
        take: realTake,
        skip: (currentPage - 1) * realTake,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(total / realTake);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      total,
      comments,
      next,
      prev,
      totalPages,
    };
  }

  @Authorized()
  @Mutation(() => Comment)
  async comment(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("chapterId", () => Int) chapterId: number,
    @Arg("content", () => String) content: string,
    @Ctx() { prisma, user }: Context,
  ): Promise<Comment> {
    const date = new Date();

    const comment = await prisma.comment.create({
      data: {
        book: { connect: { id: bookId } },
        chapter: { connect: { id: chapterId, bookId: bookId } },
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

  @Authorized()
  @Mutation(() => ReplyComment)
  async replyComment(
    @Arg("commentId", () => Int) commentId: number,
    @Arg("content", () => String) content: string,
    @Ctx() { prisma, user }: Context,
  ): Promise<ReplyComment> {
    const date = new Date();

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new GraphQLError("Bình luận không tồn tại");
    }

    const replyComment = await prisma.replyComment.create({
      data: {
        comment: { connect: { id: comment.id } },
        user: { connect: { id: user!.id } },
        content,
      },
    });

    if (replyComment) {
      await Promise.all([
        prisma.comment.update({
          where: { id: commentId },
          data: { replyCnt: { increment: 1 } },
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

    return replyComment;
  }
}
