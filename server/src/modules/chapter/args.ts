import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class CreateChapterArgs {
  @Field(() => Int)
  bookId!: number;

  @Field(() => Int)
  order!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Date)
  publishAt!: Date;

  @Field(() => Int)
  unlockPrice!: number;
}
