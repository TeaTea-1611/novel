import * as TypeGraphQL from "type-graphql";

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  CONVERTER = "CONVERTER",
  USER = "USER"
}
TypeGraphQL.registerEnumType(UserRole, {
  name: "UserRole",
  description: undefined,
});
