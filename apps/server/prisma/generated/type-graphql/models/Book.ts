import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Author } from "../models/Author";
import { BookStatistic } from "../models/BookStatistic";
import { Bookmark } from "../models/Bookmark";
import { Chapter } from "../models/Chapter";
import { Comment } from "../models/Comment";
import { Genre } from "../models/Genre";
import { Reading } from "../models/Reading";
import { Review } from "../models/Review";
import { TagOnBook } from "../models/TagOnBook";
import { User } from "../models/User";

@TypeGraphQL.ObjectType("Book", {})
export class Book {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  originalName!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  authorId?: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  originalLink!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  synopsis!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  kind!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  gender!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  status!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  poster!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  genreId!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  wordCnt!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  flowerCnt!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  readCnt!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  reviewCnt!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  chapterCnt!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  commentCnt!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  points!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  newChapterAt!: Date;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  createdById!: number;

  author?: Author | null;

  genre?: Genre;

  createdBy?: User;

  reviews?: Review[];

  chapters?: Chapter[];

  statistics?: BookStatistic[];

  tagOnBooks?: TagOnBook[];

  reading?: Reading[];

  bookmarks?: Bookmark[];

  comments?: Comment[];
}
