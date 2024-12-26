import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ChangeProfileArgs {
  @Field()
  nickname!: string;

  @Field()
  introduce!: string;

  @Field(() => [String])
  urls!: string[];

  @Field(() => Int)
  gender!: number;

  @Field()
  dob!: Date;
}

@ArgsType()
export class TwoFactorArgs {
  @Field()
  isTwoFactorEnable!: boolean;

  @Field({ nullable: true })
  code?: string | null;
}

@ArgsType()
export class NotificationSettingsArgs {
  @Field()
  newChapter!: boolean;

  @Field()
  newInteraction!: boolean;
}
