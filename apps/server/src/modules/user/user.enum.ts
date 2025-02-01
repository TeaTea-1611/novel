import { registerEnumType } from "type-graphql";
import { type UserRole as UserRoleType } from "@workspace/db";

enum UserRole {
  Admin = "Admin",
  User = "User",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "The role of the user in the system",
});

export { UserRole, type UserRoleType };
