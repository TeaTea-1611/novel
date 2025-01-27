import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Genre {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;
}
