import * as TypeGraphQL from "type-graphql";

export enum ReviewScalarFieldEnum {
  id = "id",
  userId = "userId",
  bookId = "bookId",
  point = "point",
  content = "content",
  isSpoiler = "isSpoiler",
  createdAt = "createdAt"
}
TypeGraphQL.registerEnumType(ReviewScalarFieldEnum, {
  name: "ReviewScalarFieldEnum",
  description: undefined,
});
