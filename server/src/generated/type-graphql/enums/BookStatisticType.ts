import * as TypeGraphQL from "type-graphql";

export enum BookStatisticType {
  READ = "READ",
  COMMENT = "COMMENT",
  REVIEW = "REVIEW"
}
TypeGraphQL.registerEnumType(BookStatisticType, {
  name: "BookStatisticType",
  description: undefined,
});
