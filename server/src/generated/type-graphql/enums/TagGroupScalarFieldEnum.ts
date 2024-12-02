import * as TypeGraphQL from "type-graphql";

export enum TagGroupScalarFieldEnum {
  id = "id",
  name = "name",
  color = "color",
  bgColor = "bgColor"
}
TypeGraphQL.registerEnumType(TagGroupScalarFieldEnum, {
  name: "TagGroupScalarFieldEnum",
  description: undefined,
});
