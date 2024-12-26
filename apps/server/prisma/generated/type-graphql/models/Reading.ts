import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Book } from "../models/Book";
import { User } from "../models/User";

@TypeGraphQL.ObjectType("Reading", {})
export class Reading {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  userId!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  bookId!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  currentChapter!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  readingAt!: Date;

  book?: Book;

  user?: User;
}
