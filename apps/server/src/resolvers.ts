import type { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./modules/app/app.resolver";
import { AuthResolver } from "./modules/auth/auth.resolver";
import { UserResolver } from "./modules/user/user.resolver";
import { TagResolver } from "./modules/tag/tag.resolver";

export const resolvers: NonEmptyArray<Function> = [
  AppResolver,
  AuthResolver,
  UserResolver,
  TagResolver,
];
