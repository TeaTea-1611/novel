import { ArgsType, Field, Int, registerEnumType } from "type-graphql";
import { SortOrder } from "../../enums/sort-order";
import { Gender, type GenderType } from "../../enums/gender";
import { NovelStatus, type NovelStatusType } from "./novel.enum";

@ArgsType()
export class CreateNovelArgs {
  @Field()
  title!: string;

  @Field()
  synopsis!: string;

  @Field(() => Gender)
  gender!: GenderType;

  @Field(() => Int)
  genreId!: number;

  @Field(() => [Int])
  tagIds!: number[];
}

@ArgsType()
export class ConvertNovelArgs extends CreateNovelArgs {
  @Field()
  originalName!: string;

  @Field()
  authorName!: string;

  @Field()
  originalAuthorName!: string;
}

@ArgsType()
export class UpdateNovelArgs {
  @Field(() => Int)
  novelId!: number;

  @Field(() => NovelStatus, { nullable: true })
  status?: NovelStatusType;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  synopsis?: string;

  @Field(() => Gender, { nullable: true })
  gender?: GenderType;

  @Field(() => Int, { nullable: true })
  genreId?: number;

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
}

@ArgsType()
export class UpdateConvertNovelArgs extends ConvertNovelArgs {
  @Field(() => Int)
  id!: number;
}

@ArgsType()
export class PaginatedNovelsArgs {
  @Field(() => Int, { defaultValue: 1 })
  page!: number;

  @Field(() => Int, { defaultValue: 10 })
  take!: number;

  @Field(() => String, { defaultValue: "" })
  keyword!: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => Int, { nullable: true })
  genreId?: number;

  @Field(() => [Int], { nullable: true })
  tagIds?: number[];

  @Field(() => String, { nullable: true })
  sortBy?: string;

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
export class PaginatedRankingNovelsArgs {
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
