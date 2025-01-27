import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class TagGroup {
  @Field((_type) => Int)
  id!: number;

  @Field((_type) => String)
  name!: string;

  @Field((_type) => String)
  color!: string;
}
