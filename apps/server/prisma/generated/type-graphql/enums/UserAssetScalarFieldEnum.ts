import * as TypeGraphQL from "type-graphql";

export enum UserAssetScalarFieldEnum {
  id = "id",
  userId = "userId",
  assetId = "assetId",
  receivedAt = "receivedAt"
}
TypeGraphQL.registerEnumType(UserAssetScalarFieldEnum, {
  name: "UserAssetScalarFieldEnum",
  description: undefined,
});
