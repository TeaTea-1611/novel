import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Achieve } from "../models/Achieve";
import { Book } from "../models/Book";
import { Bookmark } from "../models/Bookmark";
import { Comment } from "../models/Comment";
import { NotificationSettings } from "../models/NotificationSettings";
import { Reading } from "../models/Reading";
import { RefreshToken } from "../models/RefreshToken";
import { ReplyComment } from "../models/ReplyComment";
import { Review } from "../models/Review";
import { UserAsset } from "../models/UserAsset";
import { UserRole } from "../enums/UserRole";

@TypeGraphQL.ObjectType("User", {})
export class User {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  nickname!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  password?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  phone!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  avatar!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  avatarCover!: string;

  @TypeGraphQL.Field(_type => UserRole, {
    nullable: false
  })
  role!: "ADMIN" | "EDITOR" | "CONVERTER" | "USER";

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  gender!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  introduce!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  dob!: Date;

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  urls!: string[];

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  keyNum!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  ticketNum!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  candyNum!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  emailVerified?: Date | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isTwoFactorEnable!: boolean;

  notificationSettings?: NotificationSettings | null;

  reviews?: Review[];

  comments?: Comment[];

  createdBooks?: Book[];

  refreshTokens?: RefreshToken[];

  achieve?: Achieve | null;

  userAssets?: UserAsset[];

  reading?: Reading[];

  bookmarks?: Bookmark[];

  replyComments?: ReplyComment[];
}
