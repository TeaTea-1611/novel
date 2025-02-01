import { z } from "zod";

const titleSchema = z
  .string({ required_error: "Tên truyện là bắt buộc." })
  .min(3, { message: "Tên truyện tối thiểu 3 ký tự." })
  .max(255, { message: "Tên truyện tối đa 255 ký tự." });

const synopsisSchema = z
  .string({ required_error: "Tóm tắt là bắt buộc." })
  .min(0, { message: "Tóm tắt tối thiểu 0 ký tự." })
  .max(4000, { message: "Tóm tắt tối đa 4000 ký tự." });

const tagIdsSchema = z
  .array(z.coerce.number({ required_error: "Bắt buộc." }))
  .min(1, { message: "Tối thiểu 1 nhãn." })
  .max(5, { message: "Tối đa 5 nhãn." });

const genreIdSchema = z.coerce.number({
  invalid_type_error: "Bắt buộc.",
  required_error: "Bắt buộc.",
});

export const mutationBookSchema = z.object({
  id: z.coerce.number({ invalid_type_error: "Bắt buộc." }).optional(),
  title: titleSchema,
  synopsis: synopsisSchema,
  kind: z.string(),
  gender: z.string(),
  status: z.string(),
  genreId: genreIdSchema,
  tagIds: tagIdsSchema,
});
