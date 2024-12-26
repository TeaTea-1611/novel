import * as TypeGraphQL from "type-graphql";

export enum TwoFactorTokenScalarFieldEnum {
  id = "id",
  email = "email",
  token = "token",
  expires = "expires"
}
TypeGraphQL.registerEnumType(TwoFactorTokenScalarFieldEnum, {
  name: "TwoFactorTokenScalarFieldEnum",
  description: undefined,
});
