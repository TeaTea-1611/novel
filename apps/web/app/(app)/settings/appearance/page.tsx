"use client";

import { Wrapper } from "../wrapper";
import { AppearanceSettings } from "./appearance-settings";
import "@/public/registry/themes.css";

export default function Page() {
  return (
    <Wrapper
      title={"Tùy biến"}
      description={
        "Tùy chỉnh giao diện của ứng dụng. Tự động chuyển đổi giữa các chủ đề ngày và đêm."
      }
    >
      <AppearanceSettings />
    </Wrapper>
  );
}
