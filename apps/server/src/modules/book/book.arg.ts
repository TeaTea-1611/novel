import { ArgsType, Field, Int, registerEnumType } from "type-graphql";
import { SortOrder } from "../../enums/sort-order";

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
export class UpdateBookArgs {
  @Field(() => Int)
  bookId!: number;

  @Field(() => Int, { nullable: true })
  status?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  synopsis?: string;

  @Field(() => Int, { nullable: true })
  gender?: number;

  @Field(() => Int, { nullable: true })
  genreId?: number;

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
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
  sortBy?: "name" | "createdAt" | "updatedAt" | "status";

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.asc })
  sortOrder?: SortOrder;
}

export enum PaginatedRankingTypeEnum {
  read = "read",
  flower = "flower",
  comment = "comment",
  review = "review",
  nominate = "nominate",
}

registerEnumType(PaginatedRankingTypeEnum, {
  name: "PaginatedRankingType",
  description: undefined,
});

@ArgsType()
export class PaginatedRankingBooksArgs {
  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  take!: number;

  @Field(() => PaginatedRankingTypeEnum)
  type!: PaginatedRankingTypeEnum;

  @Field(() => Int)
  month!: number;

  @Field(() => Int)
  year!: number;
}
