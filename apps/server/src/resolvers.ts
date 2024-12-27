import type { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./modules/app/app.resolver";
import { AuthResolver } from "./modules/auth/auth.resolver";
import { UserResolver } from "./modules/user/user.resolver";
import { TagResolver } from "./modules/tag/tag.resolver";
import { GenreResolver } from "./modules/genre/genre.resolver";
import { BookResolver } from "./modules/book/book.resolver";
import { ChapterResolver } from "./modules/chapter/chapter.resolver";

export const resolvers: NonEmptyArray<Function> = [
  AppResolver,
  AuthResolver,
  UserResolver,
  TagResolver,
  GenreResolver,
  BookResolver,
  ChapterResolver,
];
