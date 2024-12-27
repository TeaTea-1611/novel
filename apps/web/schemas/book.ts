import { z } from "zod";
import { stringSchema } from "./helper";

const nameSchema = stringSchema(3, 255, "Tên");
const authorNameSchema = stringSchema(3, 255, "Tên tác giả");
const authorOriginNameSchema = stringSchema(3, 255, "Tên gốc của tác giả");
const synopsisSchema = stringSchema(0, 4000, "Tóm tắt");

const tagIdsSchema = z
  .array(z.coerce.number({ required_error: "Bắt buộc." }))
  .min(1, { message: "Tối thiểu 1 nhãn." })
  .max(5, { message: "Tối đa 5 nhãn." });

const bookGenderSchema = z.coerce
  .number({ invalid_type_error: "Bắt buộc.", required_error: "Bắt buộc." })
  .refine((val) => val === 1 || val === 2, { message: "Không hợp lệ." });

const genreIdSchema = z.coerce.number({
  invalid_type_error: "Bắt buộc.",
  required_error: "Bắt buộc.",
});

const statusSchema = z.coerce.number({
  invalid_type_error: "Bắt buộc.",
  required_error: "Bắt buộc.",
});

const baseBookSchema = {
  name: nameSchema,
  synopsis: synopsisSchema,
  gender: bookGenderSchema,
  genreId: genreIdSchema,
  tagIds: tagIdsSchema,
};

const extendedBookSchema = {
  ...baseBookSchema,
  originalName: stringSchema(3, 255, "Tên gốc truyện"),
  authorName: authorNameSchema,
  originalAuthorName: authorOriginNameSchema,
};

export const createBookSchema = z.object(baseBookSchema);

export const updateBookSchema = z.object({
  name: z.optional(nameSchema),
  synopsis: z.optional(synopsisSchema),
  gender: z.optional(bookGenderSchema),
  genreId: z.optional(genreIdSchema),
  tagIds: z.optional(tagIdsSchema),
  status: z.optional(statusSchema),
});

export const convertBookSchema = z.object(extendedBookSchema);

export const updateConvertBookSchema = z.object({
  ...extendedBookSchema,
  status: statusSchema,
});
