import { ArgsType, Field, Int } from "type-graphql";
import { SortOrder } from "../../generated/type-graphql";

@ArgsType()
export class CreateBookArgs {
  @Field()
  name!: string;

  @Field()
  synopsis!: string;

  @Field(() => Int)
  gender!: number;

  @Field(() => Int)
  genreId!: number;

  @Field(() => [Int])
  tagIds!: number[];
}

@ArgsType()
export class ConvertBookArgs extends CreateBookArgs {
  @Field()
  originalName!: string;

  @Field()
  authorName!: string;

  @Field()
  originalAuthorName!: string;
}

@ArgsType()
export class UpdateBookArgs extends CreateBookArgs {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  status!: number;
}

@ArgsType()
export class UpdateConvertBookArgs extends ConvertBookArgs {
  @Field(() => Int)
  id!: number;
}

@ArgsType()
export class PaginatedBooksArgs {
  @Field(() => Int, { defaultValue: 1 })
  page!: number;

  @Field(() => Int, { defaultValue: 10 })
  take!: number;

  @Field(() => String, { defaultValue: "" })
  keyword!: string;

  @Field(() => Int, { nullable: true })
  gender?: number;

  @Field(() => Int, { nullable: true })
  genreId?: number;

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => String, { nullable: true })
  sortBy?: "name" | "createdAt" | "updatedAt";

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.asc })
  sortOrder?: SortOrder;
}
