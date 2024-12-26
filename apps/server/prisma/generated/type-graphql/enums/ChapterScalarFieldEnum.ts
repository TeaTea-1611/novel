import * as TypeGraphQL from "type-graphql";

export enum ChapterScalarFieldEnum {
  id = "id",
  bookId = "bookId",
  order = "order",
  title = "title",
  content = "content",
  unlockPrice = "unlockPrice",
  readCnt = "readCnt",
  publishAt = "publishAt",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(ChapterScalarFieldEnum, {
  name: "ChapterScalarFieldEnum",
  description: undefined,
});
