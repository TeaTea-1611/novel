import * as TypeGraphQL from "type-graphql";

export enum TagScalarFieldEnum {
  id = "id",
  groupId = "groupId",
  name = "name"
}
TypeGraphQL.registerEnumType(TagScalarFieldEnum, {
  name: "TagScalarFieldEnum",
  description: undefined,
});
