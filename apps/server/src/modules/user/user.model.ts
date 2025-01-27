import { UserRole } from "../../enums/user-role";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => String)
  nickname!: string;

  @Field((_type) => String)
  email!: string;

  password?: string | null;

  @Field((_type) => String)
  phone!: string;

  @Field((_type) => String)
  avatar!: string;

  @Field((_type) => String)
  avatarCover!: string;

  @Field((_type) => UserRole)
  role!: "ADMIN" | "EDITOR" | "CONVERTER" | "USER";

  @Field((_type) => Int)
  gender!: number;

  @Field((_type) => String)
  introduce!: string;

  @Field((_type) => Date)
  dob!: Date;

  @Field((_type) => [String])
  urls!: string[];

  @Field((_type) => Int)
  keyNum!: number;

  @Field((_type) => Int)
  ticketNum!: number;

  @Field((_type) => Int)
  candyNum!: number;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date, {
    nullable: true,
  })
  emailVerified?: Date | null;

  @Field((_type) => Boolean)
  isTwoFactorEnable!: boolean;
}
