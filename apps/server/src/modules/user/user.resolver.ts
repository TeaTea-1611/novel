import { createWriteStream, promises as fsPromises } from "fs";
import { GraphQLUpload, type FileUpload } from "graphql-upload-ts";
import * as path from "path";
import sharp from "sharp";
import { finished } from "stream/promises";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Inject, Service } from "typedi";
import { type Context } from "../../context";
import { env } from "../../env";
import { AuthService } from "../auth/auth.service";
import { Notifications } from "./notifications.model";
import {
  ChangeProfileArgs,
  NotificationSettingsArgs,
  TwoFactorArgs,
} from "./user.arg";
import { User } from "./user.model";
import { TwoFactorResponse } from "./user.type";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(() => AuthService) private readonly authService: AuthService,
  ) {}

  @FieldResolver(() => Notifications)
  async notifications(@Root() user: User, @Ctx() { prisma }: Context) {
    return prisma.user.findUnique({ where: { id: user.id } }).notifications();
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("userId", () => Int) userId: number,
    @Ctx() { prisma }: Context,
  ): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  @Authorized()
  @Mutation(() => User)
  async changeProfile(
    @Args() args: ChangeProfileArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<User> {
    return await prisma.user.update({
      where: { id: user!.id },
      data: { ...args },
    });
  }

  @Authorized()
  @Mutation(() => User)
  async changeAvatar(
    @Arg("avatar", () => GraphQLUpload) { createReadStream }: FileUpload,
    @Ctx() { user, prisma }: Context,
  ): Promise<User> {
    const uploadDir = path.join(
      import.meta.dir,
      "../../../public/upload/avatar",
    );
    await fsPromises.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `avatar_${user!.id}.jpg`);

    const stream = createReadStream();
    const out = createWriteStream(filePath);

    try {
      const transform = sharp()
        .resize(112, 112)
        .toFormat("jpg", { quality: 100 });

      stream.pipe(transform).pipe(out);

      await finished(out);
    } catch (error) {
      throw new Error("Có lỗi xảy ra khi xử lý ảnh");
    }

    const protocol = env.NODE_ENV === "production" ? "https" : "http";

    const avatar = `${protocol}://${env.HOST}:${env.PORT}/upload/avatar/avatar_${
      user!.id
    }.jpg?${Date.now()}`;

    return await prisma.user.update({
      where: { id: user!.id },
      data: { avatar },
    });
  }

  @Authorized()
  @Mutation(() => User)
  async changeAvatarCover(
    @Arg("file", () => GraphQLUpload) { createReadStream }: FileUpload,
    @Ctx() { user, prisma }: Context,
  ): Promise<User> {
    const uploadDir = path.join(
      import.meta.dir,
      "../../../public/upload/avatar",
    );
    await fsPromises.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `image_cover_${user!.id}.jpg`);

    const stream = createReadStream();
    const out = createWriteStream(filePath);

    try {
      const transform = sharp()
        .resize(396, 112)
        .toFormat("jpg", { quality: 100 });

      stream.pipe(transform).pipe(out);

      await finished(out);
    } catch (error) {
      throw new Error("Có lỗi xảy ra khi xử lý ảnh");
    }

    const protocol = env.NODE_ENV === "production" ? "https" : "http";

    const coverImage = `${protocol}://${env.HOST}:${env.PORT}/upload/avatar/image_cover_${
      user!.id
    }.jpg?${Date.now()}`;

    return await prisma.user.update({
      where: { id: user!.id },
      data: { coverImage },
    });
  }

  @Authorized()
  @Mutation(() => TwoFactorResponse)
  async updateTwoFactor(
    @Args() { isTwoFactorEnable, code }: TwoFactorArgs,
    @Ctx() { user, prisma, redis }: Context,
  ): Promise<TwoFactorResponse> {
    if (!isTwoFactorEnable) {
      if (code) {
        const isValid = await this.authService.verifyTwoFactorCode(
          user!.id,
          code,
          redis,
        );
        if (!isValid) {
          return { success: false, message: "Mã xác thực không hợp lệ." };
        }
      } else {
        await this.authService.createAndSendNewTwoFactorCode(user!, redis);
        return {
          success: true,
          message: "Đã gửi email xác thực.",
          twoFactor: true,
        };
      }
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: { isTwoFactorAuth: isTwoFactorEnable },
    });
    return { success: true, message: "Cập nhật thành công." };
  }

  @Authorized()
  @Mutation(() => Notifications)
  async updateNotifications(
    @Args() { enableNewChapter, enableInteractions }: NotificationSettingsArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<Notifications> {
    return await prisma.notificationSettings.update({
      where: { userId: user!.id },
      data: {
        enableNewChapter,
        enableInteractions,
      },
    });
  }
}
