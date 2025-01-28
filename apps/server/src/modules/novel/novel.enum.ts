import { registerEnumType } from "type-graphql";

export enum NovelType {
  TRANSLATION = "TRANSLATION",
  ORIGINAL = "ORIGINAL",
}
registerEnumType(NovelType, {
  name: "NovelType",
  description: undefined,
});

export enum NovelStatus {
  WAITING = "WAITING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
}
registerEnumType(NovelStatus, {
  name: "NovelStatus",
  description: undefined,
});
