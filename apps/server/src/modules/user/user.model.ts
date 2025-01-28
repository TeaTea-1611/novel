import { Gender } from "../../enums/gender";
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
  coverImage!: string;

  @Field((_type) => UserRole)
  role!: "ADMIN" | "USER";

  @Field((_type) => Gender)
  gender!: "MALE" | "FEMALE" | "OTHER";

  @Field((_type) => String)
  bio!: string;

  @Field((_type) => Date)
  birthDate!: Date;

  @Field((_type) => [String])
  socialLinks!: string[];

  @Field((_type) => Int)
  keys!: number;

  @Field((_type) => Int)
  tickets!: number;

  @Field((_type) => Int)
  candies!: number;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date, {
    nullable: true,
  })
  emailVerifiedAt?: Date | null;

  @Field((_type) => Boolean)
  isTwoFactorAuth!: boolean;
}
