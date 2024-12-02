import * as TypeGraphQL from "type-graphql";

export enum RefreshTokenScalarFieldEnum {
  id = "id",
  userId = "userId",
  token = "token",
  expires = "expires"
}
TypeGraphQL.registerEnumType(RefreshTokenScalarFieldEnum, {
  name: "RefreshTokenScalarFieldEnum",
  description: undefined,
});
