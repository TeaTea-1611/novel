import * as TypeGraphQL from "type-graphql";

export enum AssetScalarFieldEnum {
  id = "id",
  type = "type",
  name = "name",
  description = "description",
  startDate = "startDate",
  endDate = "endDate",
  title = "title",
  url = "url",
  color = "color",
  isFree = "isFree"
}
TypeGraphQL.registerEnumType(AssetScalarFieldEnum, {
  name: "AssetScalarFieldEnum",
  description: undefined,
});
