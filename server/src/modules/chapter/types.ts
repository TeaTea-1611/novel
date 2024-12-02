import { Field, ObjectType } from "type-graphql";
import { Chapter } from "../../generated/type-graphql";
import { IMutationResponse } from "../../types";

@ObjectType({ implements: IMutationResponse })
export class ChapterMutationResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field({ nullable: true })
  chapter?: Chapter | null;
}
