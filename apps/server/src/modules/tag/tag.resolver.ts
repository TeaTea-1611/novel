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
import type { Context } from "../../context";
import { MutationResponse } from "../../types";
import { GraphQLError } from "graphql";
import { Tag } from "./tag.model";
import { TagGroup } from "./tag-group.model";
import { UserRole } from "../../enums/user-role";

@Service()
@Resolver(() => Tag)
export class TagResolver {
  @FieldResolver(() => TagGroup)
  async group(
    @Root() tag: Tag,
    @Ctx() { dataLoaders: { tagGroupLoader } }: Context,
  ) {
    return tagGroupLoader.load(tag.tagGroupId);
  }

  @Query(() => [Tag])
  async tags(@Ctx() { prisma }: Context): Promise<Tag[]> {
    return prisma.tag.findMany();
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Tag)
  async mutationTag(
    @Arg("tagId", () => Int, { nullable: true }) tagId: number | null,
    @Arg("name", () => String) name: string,
    @Arg("tagGroupId", () => Int) tagGroupId: number,
    @Ctx() { prisma }: Context,
  ): Promise<Tag> {
    const existing = await prisma.tag.findUnique({
      where: { name },
    });

    if (tagId) {
      const current = await prisma.tag.findUnique({
        where: { id: tagId },
      });

      if (!current) {
        throw new GraphQLError("Thẻ không tồn tại.");
      }

      if (current.name === name) {
        return current;
      }

      if (existing) {
        throw new GraphQLError("Thẻ đã tồn tại.");
      }

      return prisma.tag.update({
        where: { id: tagId },
        data: { name, tagGroupId },
      });
    }

    if (existing) {
      throw new GraphQLError("Thẻ đã tồn tại.");
    }

    return prisma.tag.create({
      data: { name, tagGroupId },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => MutationResponse)
  async deleteTags(
    @Arg("tagIds", () => [Int]) tagIds: number[],
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    if (
      await prisma.novelTag.findFirst({
        where: { tagId: { in: tagIds } },
        select: { tagId: true },
      })
    ) {
      throw new GraphQLError("Không thể xóa do có truyện có thẻ này.");
    }

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
  async mutationTagGroup(
    @Arg("tagGroupId", () => Int, { nullable: true }) tagGroupId: number | null,
    @Arg("name", () => String) name: string,
    @Arg("color", () => String) color: string,
    @Ctx() { prisma }: Context,
  ): Promise<TagGroup> {
    const existing = await prisma.tagGroup.findUnique({
      where: { name },
    });

    if (tagGroupId) {
      const current = await prisma.tagGroup.findUnique({
        where: { id: tagGroupId },
      });

      if (!current) {
        throw new GraphQLError("Nhóm thẻ không tồn tại.");
      }

      if (current.name === name) {
        return current;
      }

      if (existing) {
        throw new GraphQLError("Nhóm thẻ đã tồn tại.");
      }

      return prisma.tagGroup.update({
        where: { id: tagGroupId },
        data: { name, color },
      });
    }

    if (existing) {
      throw new GraphQLError("Nhóm thẻ đã tồn tại.");
    }

    return prisma.tagGroup.create({
      data: { name, color },
    });
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => MutationResponse)
  async deleteTagGroups(
    @Arg("tagGroupIds", () => [Int]) tagGroupIds: number[],
    @Ctx() { prisma }: Context,
  ): Promise<MutationResponse> {
    if (
      await prisma.tag.findFirst({
        where: { tagGroupId: { in: tagGroupIds } },
        select: { id: true },
      })
    ) {
      throw new GraphQLError("Không thể xóa do có thẻ thuộc nhóm này.");
    }

    await prisma.tagGroup.deleteMany({
      where: { id: { in: tagGroupIds } },
    });

    return {
      success: true,
      message: "Thành công.",
    };
  }
}
