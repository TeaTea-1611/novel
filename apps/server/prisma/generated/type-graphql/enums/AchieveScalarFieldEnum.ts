import * as TypeGraphQL from "type-graphql";

export enum AchieveScalarFieldEnum {
  id = "id",
  followCnt = "followCnt",
  readChapterCnt = "readChapterCnt",
  readBookCnt = "readBookCnt"
}
TypeGraphQL.registerEnumType(AchieveScalarFieldEnum, {
  name: "AchieveScalarFieldEnum",
  description: undefined,
});
