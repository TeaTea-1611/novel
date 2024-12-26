import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  nickname = "nickname",
  email = "email",
  password = "password",
  phone = "phone",
  avatar = "avatar",
  avatarCover = "avatarCover",
  role = "role",
  gender = "gender",
  introduce = "introduce",
  dob = "dob",
  urls = "urls",
  keyNum = "keyNum",
  ticketNum = "ticketNum",
  candyNum = "candyNum",
  createdAt = "createdAt",
  emailVerified = "emailVerified",
  isTwoFactorEnable = "isTwoFactorEnable"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
