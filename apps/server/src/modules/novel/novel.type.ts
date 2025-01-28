import { Field, Int, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";
import { Novel } from "./novel.model";

@ObjectType({ implements: IMutationResponse })
export class NovelResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field(() => Novel, { nullable: true })
  novel?: Novel | null;
}

@ObjectType()
export class PaginatedNovelsResponse {
  @Field(() => Int)
  total!: number;

  @Field(() => [Novel])
  novels!: Novel[];

  @Field(() => Int, { nullable: true })
  prev?: number | null;

  @Field(() => Int, { nullable: true })
  next?: number | null;

  @Field(() => Int)
  totalPages!: number;
}
