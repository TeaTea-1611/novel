import { Field, Int, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";
import { Novel, Comment } from "../../../prisma/generated/type-graphql";

@ObjectType()
export class PaginatedCommentsResponse {
  @Field(() => Int)
  total!: number;

  @Field(() => [Comment])
  comments!: Comment[];

  @Field(() => Int, { nullable: true })
  prev?: number | null;

  @Field(() => Int, { nullable: true })
  next?: number | null;

  @Field(() => Int)
  totalPages!: number;
}
