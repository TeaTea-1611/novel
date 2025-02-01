import { z } from "zod";
import { stringSchema } from "../utils/schema";
import { Gender, NovelKind, NovelStatus } from "../../generated/client";

export const createNovelSchema = z
  .object({
    title: stringSchema("Tên truyện", {
      min: 3,
      max: 255,
    }),
    originalTitle: stringSchema("Tên truyện gốc", {
      min: 3,
      max: 255,
    }).optional(),
    kind: z.enum([NovelKind.Original, NovelKind.Translation], {
      required_error: "Bắt buộc.",
    }),
    synopsis: stringSchema("Tóm tắt", {
      min: 3,
      max: 4000,
    }),
    gender: z.enum([Gender.Male, Gender.Female, Gender.Other], {
      required_error: "Bắt buộc.",
    }),
    status: z.enum(
      [NovelStatus.Ongoing, NovelStatus.Completed, NovelStatus.Paused],
      { required_error: "Bắt buộc." },
    ),
    genreId: z.coerce.number({
      invalid_type_error: "Không hợp lệ.",
      required_error: "Bắt buộc.",
    }),
    tagIds: z
      .array(z.coerce.number({ required_error: "Không hợp lệ." }))
      .min(1, { message: "Tối thiểu 1 nhãn." })
      .max(5, { message: "Tối đa 5 nhãn." }),
    authorId: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.kind === NovelKind.Translation && !data.originalTitle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tên truyện gốc là bắt buộc khi loại truyện là dịch.",
        path: ["originalTitle"],
      });
    }
    if (data.kind === NovelKind.Translation && !data.authorId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tác giả là bắt buộc khi loại truyện là dịch.",
        path: ["authorId"],
      });
    }
  });
