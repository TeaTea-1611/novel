import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class LoginArgs {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => String, { nullable: true })
  code!: string | null;
}

@ArgsType()
export class RegisterArgs {
  @Field()
  nickname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ArgsType()
export class VerificationArgs {
  @Field()
  token!: string;
}

@ArgsType()
export class PasswordResetArgs {
  @Field()
  email!: string;
}

@ArgsType()
export class NewPasswordArgs {
  @Field()
  token!: string;

  @Field()
  newPassword!: string;
}
