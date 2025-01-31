import { Field, Int, ObjectType } from "type-graphql";
import { Gender, type GenderType } from "../../enums/gender";
import {
  NovelStatus,
  NovelType,
  type NovelStatusType,
  type NovelTypeType,
} from "./novel.enum";

@ObjectType()
export class Novel {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => String)
  title!: string;

  @Field((_type) => String, { nullable: true })
  originalTitle?: string | null;

  @Field((_type) => Int, { nullable: true })
  authorId?: number | null;

  @Field((_type) => String)
  synopsis!: string;

  @Field((_type) => NovelType)
  type!: NovelTypeType;

  @Field((_type) => Gender)
  gender!: GenderType;

  @Field((_type) => NovelStatus)
  status!: NovelStatusType;

  @Field((_type) => String)
  coverImage!: string;

  @Field((_type) => Int)
  genreId!: number;

  @Field((_type) => Int)
  wordCount!: number;

  @Field((_type) => Int)
  totalChapters!: number;

  @Field((_type) => Date, { nullable: true })
  publishedAt?: Date | null;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  newChapterAt!: Date;

  @Field((_type) => Int)
  createdById!: number;
}
