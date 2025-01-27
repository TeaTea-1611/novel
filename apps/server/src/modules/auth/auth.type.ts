import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";
import { User } from "../user/user.model";

@ObjectType({ implements: IMutationResponse })
export class LoginResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field({ nullable: true })
  twoFactor?: boolean;

  @Field({ nullable: true })
  accessToken?: string;
}

@ObjectType()
export class RefreshTokenResponse {
  @Field({ nullable: true })
  accessToken?: string;
}
