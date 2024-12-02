import { ArgsType, Field, InputType, Int } from "type-graphql";

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

@ArgsType()
export class UpdateChapterArgs {
  @Field(() => Int)
  bookId!: number;

  @Field(() => Int)
  chapterId!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Date)
  publishAt!: Date;

  @Field(() => Int)
  unlockPrice!: number;
}

@InputType()
class SwapChapterInput {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  newOrder!: number;
}

@ArgsType()
export class SwapChaptersArgs {
  @Field(() => Int)
  bookId!: number;

  @Field(() => [SwapChapterInput])
  data!: SwapChapterInput[];
}
