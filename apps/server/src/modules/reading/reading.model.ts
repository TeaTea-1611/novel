import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Reading {
  @Field((_type) => Int)
  userId!: number;

  @Field((_type) => Int)
  novelId!: number;

  @Field((_type) => Int)
  chapterId!: number;

  @Field((_type) => Date)
  lastRead!: Date;
}
