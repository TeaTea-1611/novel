import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { TagGroup } from "../models/TagGroup";
import { TagOnBook } from "../models/TagOnBook";

@TypeGraphQL.ObjectType("Tag", {})
export class Tag {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  groupId!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  tagOnBooks?: TagOnBook[];

  group?: TagGroup;
}
