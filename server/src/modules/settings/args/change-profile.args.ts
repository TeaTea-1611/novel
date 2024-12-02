import { ArgsType, Field, Int } from "type-graphql";
import { Introduce, Nickname } from "../../user";
import { IsIn } from "class-validator";

@ArgsType()
export class ChangeProfileArgs {
  @Field()
  @Nickname()
  nickname!: string;

  @Field()
  @Introduce()
  introduce!: string;

  @Field(() => [String])
  urls!: string[];

  @Field(() => Int)
  @IsIn([1, 2, 3], { message: "Giá trị không hợp lệ." })
  gender!: number;

  @Field()
  dob!: Date;
}
