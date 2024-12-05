import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BookSummary {
  @Field(() => Int)
  readCnt!: number;

  @Field(() => Int)
  commentCnt!: number;

  @Field(() => Int)
  chapterCnt!: number;

  @Field(() => Int)
  reviewCnt!: number;

  @Field(() => Float)
  avgPoints!: number;
}
