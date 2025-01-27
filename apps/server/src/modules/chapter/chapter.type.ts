import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";
import { Chapter } from "./chapter.model";

@ObjectType({ implements: IMutationResponse })
export class ChapterMutationResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field(() => Chapter, { nullable: true })
  chapter?: Chapter | null;
}
