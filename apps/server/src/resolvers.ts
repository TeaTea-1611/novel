import type { NonEmptyArray } from "type-graphql";
import { AppResolver } from "./modules/app/app.resolver";
import { AuthResolver } from "./modules/auth/auth.resolver";
import { UserResolver } from "./modules/user/user.resolver";
import { TagResolver } from "./modules/tag/tag.resolver";
import { GenreResolver } from "./modules/genre/genre.resolver";
import { ChapterResolver } from "./modules/chapter/chapter.resolver";
import { ReadingResolver } from "./modules/reading/reading.resolver";
import { NovelResolver } from "./modules/novel/novel.resolver";

export const resolvers: NonEmptyArray<Function> = [
  AppResolver,
  AuthResolver,
  UserResolver,
  TagResolver,
  GenreResolver,
  NovelResolver,
  ChapterResolver,
  ReadingResolver,
];
