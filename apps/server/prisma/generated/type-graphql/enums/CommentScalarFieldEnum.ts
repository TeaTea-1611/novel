import * as TypeGraphQL from "type-graphql";

export enum CommentScalarFieldEnum {
  id = "id",
  userId = "userId",
  bookId = "bookId",
  chapterId = "chapterId",
  content = "content",
  likeCnt = "likeCnt",
  replyCnt = "replyCnt",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(CommentScalarFieldEnum, {
  name: "CommentScalarFieldEnum",
  description: undefined,
});
