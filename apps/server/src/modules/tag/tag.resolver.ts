import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import {
  Tag,
  TagGroup,
  UserRole,
} from "../../../prisma/generated/type-graphql";
import type { Context } from "../../context";
import { MutationResponse } from "../../types";
import { GraphQLError } from "graphql";

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

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Tag)
  async createTag(
    @Arg("name", () => String) name: string,
    @Arg("groupId", () => Int) groupId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Tag> {
    if (await prisma.tag.findUnique({ where: { name } })) {
      throw new GraphQLError("Thẻ đã tồn tại");
    }
    return await prisma.tag.create({
      data: { name, groupId },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Tag)
  async updateTag(
    @Arg("tagId", () => Int) tagId: number,
    @Arg("name", () => String) name: string,
    @Arg("groupId", () => Int) groupId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Tag> {
    return await prisma.tag.update({
      where: { id: tagId },
      data: { name, groupId },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => MutationResponse)
  async deleteTags(
    @Arg("tagIds", () => [Int]) tagIds: number[],
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    await prisma.tag.deleteMany({
      where: { id: { in: tagIds } },
    });

    return {
      success: true,
      message: "Thành công.",
    };
  }

  @Query(() => [TagGroup])
  async tagGroups(@Ctx() { prisma }: Context): Promise<TagGroup[]> {
    return prisma.tagGroup.findMany();
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => TagGroup)
  async createTagGroup(
    @Arg("name", () => String) name: string,
    @Arg("color", () => String) color: string,
    @Ctx() { prisma }: Context,
  ): Promise<TagGroup> {
    if (await prisma.tagGroup.findUnique({ where: { name } })) {
      throw new GraphQLError("Nhóm thẻ đã tồn tại");
    }
    return await prisma.tagGroup.create({
      data: { name, color },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => TagGroup)
  async updateTagGroup(
    @Arg("tagGroupId", () => Int) tagGroupId: number,
    @Arg("name", () => String) name: string,
    @Arg("color", () => String) color: string,
    @Ctx() { prisma }: Context,
  ): Promise<TagGroup> {
    return await prisma.tagGroup.update({
      where: { id: tagGroupId },
      data: { name, color },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => MutationResponse)
  async deleteTagGroups(
    @Arg("tagGroupIds", () => [Int]) tagGroupIds: number[],
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    await prisma.tagGroup.deleteMany({
      where: { id: { in: tagGroupIds } },
    });

    return {
      success: true,
      message: "Thành công.",
    };
  }
}
