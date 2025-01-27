import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Book {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => String)
  name!: string;

  @Field((_type) => String)
  originalName!: string;

  @Field((_type) => Int, {
    nullable: true,
  })
  authorId?: number | null;

  @Field((_type) => String)
  originalLink!: string;

  @Field((_type) => String)
  synopsis!: string;

  @Field((_type) => Int)
  kind!: number;

  @Field((_type) => Int)
  gender!: number;

  @Field((_type) => Int)
  status!: number;

  @Field((_type) => String)
  poster!: string;

  @Field((_type) => Int)
  genreId!: number;

  @Field((_type) => Int)
  wordCnt!: number;

  @Field((_type) => Int)
  flowerCnt!: number;

  @Field((_type) => Int)
  readCnt!: number;

  @Field((_type) => Int)
  reviewCnt!: number;

  @Field((_type) => Int)
  chapterCnt!: number;

  @Field((_type) => Int)
  commentCnt!: number;

  @Field((_type) => Float)
  points!: number;

  @Field((_type) => Date)
  createdAt!: Date;

  @Field((_type) => Date)
  newChapterAt!: Date;

  @Field((_type) => Int)
  createdById!: number;
}
