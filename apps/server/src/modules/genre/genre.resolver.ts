import { GraphQLError } from "graphql";
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
import { UserRole } from "../user/user.enum";
import { MutationResponse } from "../../types";
import { Genre } from "./genre.model";

@Service()
@Resolver(() => Genre)
export class GenreResolver {
  @Query(() => [Genre])
  async genres(@Ctx() { prisma }: Context): Promise<Genre[]> {
    return prisma.genre.findMany();
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Genre)
  async mutationGenre(
    @Arg("genreId", () => Int, { nullable: true }) genreId: number | null,
    @Arg("name", () => String) name: string,
    @Ctx() { prisma }: Context,
  ): Promise<Genre> {
    const existing = await prisma.genre.findUnique({
      where: { name },
    });

    if (genreId) {
      const current = await prisma.genre.findUnique({
        where: { id: genreId },
      });

      if (!current) {
        throw new GraphQLError("Thể loại không tồn tại.");
      }

      if (current.name === name) {
        return current;
      }

      if (existing) {
        throw new GraphQLError("Thể loại đã tồn tại.");
      }

      return prisma.genre.update({
        where: { id: genreId },
        data: { name },
      });
    }

    if (existing) {
      throw new GraphQLError("Thể loại đã tồn tại.");
    }

    return prisma.genre.create({
      data: { name },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => MutationResponse)
  async deleteGenres(
    @Arg("genreIds", () => [Int]) genreIds: number[],
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    if (
      await prisma.novel.findFirst({
        where: { genreId: { in: genreIds } },
        select: { id: true },
      })
    ) {
      throw new GraphQLError("Không thể xóa do có truyện có thể loại này");
    }

    await prisma.genre.deleteMany({
      where: { id: { in: genreIds } },
    });

    return {
      success: true,
      message: "Thành công.",
    };
  }
}
