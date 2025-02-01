import { registerEnumType } from "type-graphql";
import { type Gender as GenderType } from "@workspace/db";

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

registerEnumType(Gender, {
  name: "Gender",
  description: undefined,
});

export { Gender, type GenderType };
