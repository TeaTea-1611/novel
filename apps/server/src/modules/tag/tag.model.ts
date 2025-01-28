import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => Int)
  tagGroupId!: number;

  @Field((_type) => String)
  name!: string;
}
