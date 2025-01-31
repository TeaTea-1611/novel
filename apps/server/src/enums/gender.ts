import { registerEnumType } from "type-graphql";
import { type Gender as GenderType } from "@prisma/client";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

registerEnumType(Gender, {
  name: "Gender",
  description: undefined,
});

export { Gender, type GenderType };
