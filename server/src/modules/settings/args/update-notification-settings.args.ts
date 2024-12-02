import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UpdateNotificationSettingsArgs {
  @Field()
  newChapter!: boolean;

  @Field()
  newInteraction!: boolean;
}
