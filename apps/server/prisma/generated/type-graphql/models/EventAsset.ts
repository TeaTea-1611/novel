import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Asset } from "../models/Asset";
import { Event } from "../models/Event";

@TypeGraphQL.ObjectType("EventAsset", {})
export class EventAsset {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  eventId!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  assetId!: number;

  event?: Event;

  asset?: Asset;
}
