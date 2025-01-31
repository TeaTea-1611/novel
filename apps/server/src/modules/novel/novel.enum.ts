import { registerEnumType } from "type-graphql";
import {
  type NovelType as NovelTypeType,
  type NovelStatus as NovelStatusType,
} from "@prisma/client";

enum NovelType {
  TRANSLATION = "TRANSLATION",
  ORIGINAL = "ORIGINAL",
}
registerEnumType(NovelType, {
  name: "NovelType",
  description: undefined,
});

enum NovelStatus {
  WAITING = "WAITING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
}
registerEnumType(NovelStatus, {
  name: "NovelStatus",
  description: undefined,
});

export { NovelType, NovelStatus, type NovelStatusType, type NovelTypeType };
