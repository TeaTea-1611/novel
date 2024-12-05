import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ChapterStatisticArgs {
  @Field(() => Int)
  bookId!: number;

  @Field(() => Int)
  days!: number;
}
