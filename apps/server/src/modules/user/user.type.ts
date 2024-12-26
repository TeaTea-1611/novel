import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "../../types";

// import { applyModelsEnhanceMap } from "../../../prisma/generated/type-graphql";

// applyModelsEnhanceMap({
//   User: {
//     class: [
//       ObjectType({
//         description: "Generated omitted type with custom description",
//       }),
//     ],
//   },
// });

@ObjectType({ implements: IMutationResponse })
export class TwoFactorResponse implements IMutationResponse {
  success!: boolean;
  message!: string;

  @Field({ nullable: true })
  twoFactor?: boolean;
}
