import { ArgsType, Field, Int } from "type-graphql";
import { Gender } from "../../enums/gender";

@ArgsType()
export class ChangeProfileArgs {
  @Field()
  nickname!: string;

  @Field()
  bio!: string;

  @Field(() => [String])
  socialLinks!: string[];

  @Field(() => Gender)
  gender!: Gender.MALE | Gender.FEMALE | Gender.OTHER;

  @Field()
  birthDate!: Date;
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
  enableNewChapter!: boolean;

  @Field()
  enableInteractions!: boolean;
}
