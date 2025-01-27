import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Reading {
  @Field((_type) => Int)
  userId!: number;

  @Field((_type) => Int)
  bookId!: number;

  @Field((_type) => Int)
  currentChapter!: number;

  @Field((_type) => Date)
  readingAt!: Date;
}
