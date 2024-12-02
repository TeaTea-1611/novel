import * as TypeGraphQL from "type-graphql";

export enum ReadingScalarFieldEnum {
  userId = "userId",
  bookId = "bookId",
  currentChapter = "currentChapter",
  readingAt = "readingAt"
}
TypeGraphQL.registerEnumType(ReadingScalarFieldEnum, {
  name: "ReadingScalarFieldEnum",
  description: undefined,
});
