import { Field, ObjectType } from "type-graphql";
import { User } from "../../../generated/type-graphql";
import { IMutationResponse } from "../../../types";

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field({ nullable: true })
  user?: User | null;
}
