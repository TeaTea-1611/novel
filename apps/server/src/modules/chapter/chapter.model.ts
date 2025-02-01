import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Chapter {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => Int)
  novelId!: number;

  @Field((_type) => Int)
  chapterNumber!: number;

  @Field((_type) => String)
  title!: string;

  content?: string;

  @Field((_type) => Int)
  unlockPrice!: number;

  @Field((_type) => Int)
  readCnt!: number;

  @Field((_type) => Date)
  publishAt!: Date;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  updatedAt!: Date;
}

@ObjectType()
export class ChapterStatistic {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => Int)
  chapterId!: number;

  @Field((_type) => Int)
  read!: number;

  @Field((_type) => Date)
  date!: Date;
}
