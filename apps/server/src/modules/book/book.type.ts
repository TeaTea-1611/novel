import { Field, Int, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";
import { Book } from "../../../prisma/generated/type-graphql";

@ObjectType({ implements: IMutationResponse })
export class BookResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field(() => Book, { nullable: true })
  book?: Book | null;
}

@ObjectType()
export class PaginatedBooksResponse {
  @Field(() => Int)
  total!: number;

  @Field(() => [Book])
  books!: Book[];

  @Field(() => Int, { nullable: true })
  prev?: number | null;

  @Field(() => Int, { nullable: true })
  next?: number | null;

  @Field(() => Int)
  totalPages!: number;
}
