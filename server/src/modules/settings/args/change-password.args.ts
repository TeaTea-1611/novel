import { IsOptional } from "class-validator";
import { ArgsType, Field } from "type-graphql";
import { Password } from "../../user";

@ArgsType()
export class ChangePasswordArgs {
  @Field({ nullable: true })
  @IsOptional()
  password!: string | null;

  @Field()
  @Password()
  newPassword!: string;
}
