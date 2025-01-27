import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class NotificationSettings {
  @Field((_type) => Int)
  userId!: number;

  @Field((_type) => Boolean)
  newChapter!: boolean;

  @Field((_type) => Boolean)
  newInteraction!: boolean;
}
