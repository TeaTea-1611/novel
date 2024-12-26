import { Field, ObjectType } from "type-graphql";
import { User } from "../../../prisma/generated/type-graphql";
import { IMutationResponse } from "../../types";

@ObjectType({ implements: IMutationResponse })
export class LoginResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field({ nullable: true })
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
