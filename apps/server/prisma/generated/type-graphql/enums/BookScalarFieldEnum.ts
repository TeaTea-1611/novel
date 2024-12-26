import * as TypeGraphQL from "type-graphql";

export enum BookScalarFieldEnum {
  id = "id",
  name = "name",
  originalName = "originalName",
  authorId = "authorId",
  originalLink = "originalLink",
  synopsis = "synopsis",
  kind = "kind",
  gender = "gender",
  status = "status",
  poster = "poster",
  genreId = "genreId",
  wordCnt = "wordCnt",
  flowerCnt = "flowerCnt",
  readCnt = "readCnt",
  reviewCnt = "reviewCnt",
  chapterCnt = "chapterCnt",
  commentCnt = "commentCnt",
  points = "points",
  createdAt = "createdAt",
  newChapterAt = "newChapterAt",
  createdById = "createdById"
}
TypeGraphQL.registerEnumType(BookScalarFieldEnum, {
  name: "BookScalarFieldEnum",
  description: undefined,
});
