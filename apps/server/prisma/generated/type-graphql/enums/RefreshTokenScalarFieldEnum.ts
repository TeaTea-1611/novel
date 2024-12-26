import * as TypeGraphQL from "type-graphql";

export enum RefreshTokenScalarFieldEnum {
  token = "token",
  userId = "userId",
  tokenFamily = "tokenFamily",
  active = "active",
  expiresAt = "expiresAt",
  createdAt = "createdAt"
}
TypeGraphQL.registerEnumType(RefreshTokenScalarFieldEnum, {
  name: "RefreshTokenScalarFieldEnum",
  description: undefined,
});
