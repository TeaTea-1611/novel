import * as TypeGraphQL from "type-graphql";

export enum AuthorScalarFieldEnum {
  id = "id",
  name = "name",
  originalName = "originalName"
}
TypeGraphQL.registerEnumType(AuthorScalarFieldEnum, {
  name: "AuthorScalarFieldEnum",
  description: undefined,
});
