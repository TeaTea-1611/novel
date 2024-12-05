import * as TypeGraphQL from "type-graphql";

export enum ChapterStatisticScalarFieldEnum {
  id = "id",
  chapterId = "chapterId",
  read = "read",
  date = "date"
}
TypeGraphQL.registerEnumType(ChapterStatisticScalarFieldEnum, {
  name: "ChapterStatisticScalarFieldEnum",
  description: undefined,
});
