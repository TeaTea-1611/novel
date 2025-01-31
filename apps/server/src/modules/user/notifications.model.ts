import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Notifications {
  @Field((_type) => Int)
  userId!: number;

  @Field((_type) => Boolean)
  enableNewChapter!: boolean;

  @Field((_type) => Boolean)
  enableInteractions!: boolean;
}
