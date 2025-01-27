import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Author {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => String)
  name!: string;

  @Field((_type) => String)
  originalName!: string;
}
