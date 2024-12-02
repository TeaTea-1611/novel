import { Ctx, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Genre } from "../../generated/type-graphql";
import type { Context } from "../../context";

@Service()
@Resolver(() => Genre)
export class GenreResolver {
  @Query(() => [Genre])
  async genres(@Ctx() { prisma }: Context): Promise<Genre[]> {
    return prisma.genre.findMany();
  }
}
