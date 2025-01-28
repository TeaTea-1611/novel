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
    @Arg("NovelId", () => Int) NovelId: number,
    @Arg("page", () => Int) page: number,
    @Arg("take", () => Int) take: number,
    @Ctx() { prisma }: Context,
  ): Promise<PaginatedCommentsResponse> {
    const realTake = Math.min(take, 20);
    const currentPage = Math.max(page, 1);

    const [total, comments] = await Promise.all([
      await prisma.comment.count({
        where: { NovelId },
      }),
      await prisma.comment.findMany({
        where: { NovelId },
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
    @Arg("NovelId", () => Int) NovelId: number,
    @Arg("chapterId", () => Int) chapterId: number,
    @Arg("content", () => String) content: string,
    @Ctx() { prisma, user }: Context,
  ): Promise<Comment> {
    const date = new Date();

    const comment = await prisma.comment.create({
      data: {
        Novel: { connect: { id: NovelId } },
        chapter: { connect: { id: chapterId, NovelId: NovelId } },
        user: { connect: { id: user!.id } },
        content,
      },
    });

    if (comment) {
      await Promise.all([
        prisma.Novel.update({
          where: { id: comment.NovelId },
          data: { commentCnt: { increment: 1 } },
          select: { id: true },
        }),
        prisma.NovelStatistic.upsert({
          where: {
            NovelId_date: {
              NovelId: comment.NovelId,
              date,
            },
          },
          create: {
            NovelId: comment.NovelId,
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
        prisma.NovelStatistic.upsert({
          where: {
            NovelId_date: {
              NovelId: comment.NovelId,
              date,
            },
          },
          create: {
            NovelId: comment.NovelId,
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
