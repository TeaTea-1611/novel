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
import { Genre, UserRole } from "../../../prisma/generated/type-graphql";
import type { Context } from "../../context";
import { MutationResponse } from "../../types";
import { GraphQLError } from "graphql";

@Service()
@Resolver(() => Genre)
export class GenreResolver {
  @Query(() => [Genre])
  async genres(@Ctx() { prisma }: Context): Promise<Genre[]> {
    return prisma.genre.findMany();
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Genre)
  async createGenre(
    @Arg("name", () => String) name: string,
    @Ctx() { prisma }: Context,
  ): Promise<Genre> {
    if (await prisma.genre.findUnique({ where: { name } })) {
      throw new GraphQLError("Thể loại đã tồn tại");
    }

    return await prisma.genre.create({
      data: { name },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Genre)
  async updateGenre(
    @Arg("genreId", () => Int) genreId: number,
    @Arg("name", () => String) name: string,
    @Ctx() { prisma }: Context,
  ): Promise<Genre> {
    return await prisma.genre.update({
      where: { id: genreId },
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
      await prisma.book.findFirst({
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
