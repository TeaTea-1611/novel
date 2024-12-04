import argon2 from "argon2";
import { createWriteStream, promises as fsPromises } from "fs";
import * as path from "path";
import sharp from "sharp";
import { finished } from "stream/promises";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Inject, Service } from "typedi";
import type { Context } from "../../context";
import { NotificationSettings, User } from "../../generated/type-graphql";
import { MutationResponse, type Upload } from "../../types";
import { AuthService } from "../auth";
import {
  ChangePasswordArgs,
  ChangeProfileArgs,
  TwoFactorArgs,
  UpdateNotificationSettingsArgs,
} from "./args";
import { TwoFactorResponse } from "./types";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { env } from "../../env";

@Service()
@Resolver(() => User)
export class SettingsResolver {
  constructor(
    @Inject(() => AuthService) private readonly authService: AuthService,
  ) {}

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
  @Mutation(() => MutationResponse)
  async changePassword(
    @Args() { password = "", newPassword }: ChangePasswordArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<MutationResponse> {
    if (
      user?.password &&
      (!password || !(await argon2.verify(user.password, password)))
    ) {
      return { success: false, message: "Mật khẩu không đúng." };
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: { password: await argon2.hash(newPassword) },
    });

    return { success: true, message: "Mật khẩu đã được thay đổi." };
  }

  @Authorized()
  @Mutation(() => User)
  async changeAvatar(
    @Arg("avatar", () => GraphQLUpload) { createReadStream }: Upload,
    @Ctx() { user, prisma }: Context,
  ): Promise<User> {
    const uploadDir = path.join(
      import.meta.dir,
      "../../../public/upload/avatar",
    );
    await fsPromises.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${user!.id}.jpg`);

    const stream = createReadStream();
    const out = createWriteStream(filePath);

    try {
      const transform = sharp()
        .resize(208, 208)
        .toFormat("jpg", { quality: 100 });

      stream.pipe(transform).pipe(out);

      await finished(out);
    } catch (error) {
      throw new Error("Có lỗi xảy ra khi xử lý ảnh");
    }

    const protocol = env.NODE_ENV === "production" ? "https" : "http";

    const avatar = `${protocol}://${env.HOST}:${env.PORT}/upload/avatar/${
      user!.id
    }.jpg?${Date.now()}`;

    return await prisma.user.update({
      where: { id: user!.id },
      data: { avatar },
    });
  }

  @Authorized()
  @Query(() => NotificationSettings)
  async notificationSettings(@Ctx() { user, prisma }: Context) {
    return await prisma.notificationSettings.findUnique({
      where: { userId: user!.id },
    });
  }

  @Authorized()
  @Mutation(() => NotificationSettings)
  async updateNotificationSettings(
    @Args() { newChapter, newInteraction }: UpdateNotificationSettingsArgs,
    @Ctx() { user, prisma }: Context,
  ): Promise<NotificationSettings> {
    return await prisma.notificationSettings.update({
      where: { userId: user!.id },
      data: {
        newChapter,
        newInteraction,
      },
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
      data: { isTwoFactorEnable },
    });
    return { success: true, message: "Cập nhật thành công." };
  }
}
