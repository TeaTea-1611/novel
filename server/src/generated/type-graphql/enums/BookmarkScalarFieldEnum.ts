import * as TypeGraphQL from "type-graphql";

export enum BookmarkScalarFieldEnum {
  userId = "userId",
  bookId = "bookId",
  createdAt = "createdAt"
}
TypeGraphQL.registerEnumType(BookmarkScalarFieldEnum, {
  name: "BookmarkScalarFieldEnum",
  description: undefined,
});
