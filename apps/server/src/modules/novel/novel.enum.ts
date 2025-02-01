import { registerEnumType } from "type-graphql";
import {
  type NovelKind as NovelKindType,
  type NovelStatus as NovelStatusType,
} from "@workspace/db";

enum NovelKind {
  Translation = "Translation",
  Original = "Original",
}
registerEnumType(NovelKind, {
  name: "NovelKind",
  description: undefined,
});

enum NovelStatus {
  Ongoing = "Ongoing",
  Completed = "Completed",
  Paused = "Paused",
}
registerEnumType(NovelStatus, {
  name: "NovelStatus",
  description: undefined,
});

export { NovelKind, NovelStatus, type NovelStatusType, type NovelKindType };
