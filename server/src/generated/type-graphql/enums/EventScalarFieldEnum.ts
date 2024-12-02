import * as TypeGraphQL from "type-graphql";

export enum EventScalarFieldEnum {
  id = "id",
  name = "name",
  description = "description",
  webPath = "webPath",
  appPath = "appPath",
  startDate = "startDate",
  endDate = "endDate"
}
TypeGraphQL.registerEnumType(EventScalarFieldEnum, {
  name: "EventScalarFieldEnum",
  description: undefined,
});
