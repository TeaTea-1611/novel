import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { type Context } from "../../context";
import { NotificationSettings, User } from "../../generated/type-graphql";

@Service()
@Resolver(() => User)
export class UserResolver {
  @FieldResolver(() => NotificationSettings)
  async notificationSettings(@Root() user: User, @Ctx() { prisma }: Context) {
    return prisma.user
      .findUnique({ where: { id: user.id } })
      .notificationSettings();
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("userId", () => Int) userId: number,
    @Ctx() { prisma }: Context,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: userId } });
  }
}
