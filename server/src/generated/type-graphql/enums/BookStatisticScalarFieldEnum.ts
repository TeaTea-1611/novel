import * as TypeGraphQL from "type-graphql";

export enum BookStatisticScalarFieldEnum {
  id = "id",
  bookId = "bookId",
  type = "type",
  value = "value",
  date = "date"
}
TypeGraphQL.registerEnumType(BookStatisticScalarFieldEnum, {
  name: "BookStatisticScalarFieldEnum",
  description: undefined,
});
