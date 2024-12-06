import * as TypeGraphQL from "type-graphql";

export enum ReplyCommentScalarFieldEnum {
  id = "id",
  userId = "userId",
  commentId = "commentId",
  content = "content",
  likeCnt = "likeCnt",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(ReplyCommentScalarFieldEnum, {
  name: "ReplyCommentScalarFieldEnum",
  description: undefined,
});
