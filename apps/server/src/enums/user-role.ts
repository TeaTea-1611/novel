import { registerEnumType } from "type-graphql";

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  CONVERTER = "CONVERTER",
  USER = "USER",
}
registerEnumType(UserRole, {
  name: "UserRole",
  description: undefined,
});
