import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SEND_MAIL_USER: z.string().min(1),
    SEND_MAIL_PASS: z.string().min(1),
  },
  runtimeEnv: process.env,
});
