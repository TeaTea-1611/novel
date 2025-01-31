import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";

@ObjectType({ implements: IMutationResponse })
export class TwoFactorResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field({ nullable: true })
  twoFactor?: boolean;
}
