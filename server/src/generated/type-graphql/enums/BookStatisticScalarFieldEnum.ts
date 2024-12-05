import * as TypeGraphQL from "type-graphql";

export enum BookStatisticScalarFieldEnum {
  id = "id",
  bookId = "bookId",
  flower = "flower",
  read = "read",
  comment = "comment",
  review = "review",
  nominate = "nominate",
  date = "date"
}
TypeGraphQL.registerEnumType(BookStatisticScalarFieldEnum, {
  name: "BookStatisticScalarFieldEnum",
  description: undefined,
});
