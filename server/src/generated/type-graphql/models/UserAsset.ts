import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Asset } from "../models/Asset";
import { User } from "../models/User";

@TypeGraphQL.ObjectType("UserAsset", {})
export class UserAsset {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  userId!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  assetId!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  receivedAt!: Date;

  user?: User;

  asset?: Asset;
}
