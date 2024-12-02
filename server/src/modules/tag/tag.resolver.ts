import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Tag, TagGroup } from "../../generated/type-graphql";
import type { Context } from "../../context";

@Service()
@Resolver(() => Tag)
export class TagResolver {
  @FieldResolver(() => TagGroup)
  async group(
    @Root() tag: Tag,
    @Ctx() { dataLoaders: { tagGroupLoader } }: Context,
  ) {
    return tagGroupLoader.load(tag.groupId);
  }

  @Query(() => [Tag])
  async tags(@Ctx() { prisma }: Context): Promise<Tag[]> {
    return prisma.tag.findMany();
  }
}
