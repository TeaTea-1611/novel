import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => Int)
  groupId!: number;

  @Field((_type) => String)
  name!: string;
}
