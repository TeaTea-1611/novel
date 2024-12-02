import { Field, ObjectType } from "type-graphql";
import { Reading } from "../../../generated/type-graphql";

@ObjectType()
export class PaginatedReading {
  @Field()
  totalCount!: number;

  @Field({ nullable: true })
  cursor?: Date | null;

  @Field()
  hasMore!: boolean;

  @Field(() => [Reading])
  reading!: Reading[];
}
