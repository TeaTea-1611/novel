import { z } from "zod";

const nameSchema = z
  .string({ required_error: "Tên truyện là bắt buộc." })
  .min(3, { message: "Tên truyện tối thiểu 3 ký tự." })
  .max(255, { message: "Tên truyện tối đa 255 ký tự." });

const authorNameSchema = z
  .string({ required_error: "Tên tác giả là bắt buộc." })
  .min(3, { message: "Tên tác giả tối thiểu 3 ký tự." })
  .max(255, { message: "Tên tác giả tối đa 255 ký tự." });

const authorOriginNameSchema = z
  .string({ required_error: "Tên gốc của tác giả là bắt buộc." })
  .min(3, { message: "Tên gốc của tác giả tối thiểu 3 ký tự." })
  .max(255, { message: "Tên gốc của tác giả tối đa 255 ký tự." });

const synopsisSchema = z
  .string({ required_error: "Tóm tắt là bắt buộc." })
  .min(0, { message: "Tóm tắt tối thiểu 0 ký tự." })
  .max(4000, { message: "Tóm tắt tối đa 4000 ký tự." });

const tagIdsSchema = z
  .array(z.coerce.number({ required_error: "Bắt buộc." }))
  .min(1, { message: "Tối thiểu 1 nhãn." })
  .max(5, { message: "Tối đa 5 nhãn." });

const bookGenderSchema = z.coerce.number({
  invalid_type_error: "Bắt buộc.",
  required_error: "Bắt buộc.",
});

const genreIdSchema = z.coerce.number({
  invalid_type_error: "Bắt buộc.",
  required_error: "Bắt buộc.",
});

const statusSchema = z.coerce.number({
  invalid_type_error: "Bắt buộc.",
  required_error: "Bắt buộc.",
});

const originalNameSchema = z
  .string({ required_error: "Tên gốc truyện là bắt buộc." })
  .min(3, { message: "Tên gốc truyện tối thiểu 3 ký tự." })
  .max(255, { message: "Tên gốc truyện tối đa 255 ký tự." });

const baseBookSchema = {
  name: nameSchema,
  synopsis: synopsisSchema,
  gender: bookGenderSchema,
  genreId: genreIdSchema,
  tagIds: tagIdsSchema,
};

const extendedBookSchema = {
  ...baseBookSchema,
  originalName: originalNameSchema,
  authorName: authorNameSchema,
  originalAuthorName: authorOriginNameSchema,
};

export const createBookSchema = z.object(baseBookSchema);

export const updateBookSchema = z.object({
  name: nameSchema.optional(),
  synopsis: synopsisSchema.optional(),
  gender: bookGenderSchema.optional(),
  genreId: genreIdSchema.optional(),
  tagIds: tagIdsSchema.optional(),
  status: statusSchema.optional(),
});

export const convertBookSchema = z.object(extendedBookSchema);

export const updateConvertBookSchema = z.object({
  ...extendedBookSchema,
  status: statusSchema,
});
