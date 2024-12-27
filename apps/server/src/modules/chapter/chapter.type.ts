import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";
import { Chapter } from "../../../prisma/generated/type-graphql";

@ObjectType({ implements: IMutationResponse })
export class ChapterMutationResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field(() => Chapter, { nullable: true })
  chapter?: Chapter | null;
}
