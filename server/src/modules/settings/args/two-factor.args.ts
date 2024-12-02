import { ArgsType, Field } from "type-graphql";
import { TwoFactorCode } from "../../user";

@ArgsType()
export class TwoFactorArgs {
  @Field()
  isTwoFactorEnable!: boolean;

  @Field({ nullable: true })
  @TwoFactorCode()
  code!: string | null;
}
