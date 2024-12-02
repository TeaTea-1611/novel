import { Field, InterfaceType, ObjectType } from "type-graphql";

@InterfaceType()
export abstract class IMutationResponse {
  @Field()
  success!: boolean;

  @Field()
  message!: string;
}

@ObjectType({ implements: IMutationResponse })
export class MutationResponse implements IMutationResponse {
  success!: boolean;
  message!: string;
}
