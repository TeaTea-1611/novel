import { registerEnumType } from "type-graphql";
import { type UserRole as UserRoleType } from "@prisma/client";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "The role of the user in the system",
});

export { UserRole, type UserRoleType };
