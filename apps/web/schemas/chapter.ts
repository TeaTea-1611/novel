import { z } from "zod";
import { stringSchema } from "./helper";

export const createChapterSchema = z.object({
  title: stringSchema(3, 255, "Tên chương"),
  content: stringSchema(0, 4000, "Nội dung chương"),
  publishAt: z.date(),
  unlockPrice: z.coerce.number({
    invalid_type_error: "Không hợp lệ",
    required_error: "Bắt buộc.",
  }),
});
