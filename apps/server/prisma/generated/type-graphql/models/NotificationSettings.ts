import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { User } from "../models/User";

@TypeGraphQL.ObjectType("NotificationSettings", {})
export class NotificationSettings {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  userId!: number;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  newChapter!: boolean;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  newInteraction!: boolean;

  user?: User;
}
