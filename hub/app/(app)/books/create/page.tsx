"use client";

import { CardWrapper } from "@/components/card-wrapper";
import { CreateBookForm } from "./create-book-form";

export default function Page() {
  return (
    <CardWrapper
      title="Thêm truyện mới (Sáng tác)"
      description={
        <>
          - Lưu ý: Để đăng truyện do bạn sáng tác, vui lòng sử dụng
          https://...com.
          <br /> - Tips: Để không mất thời gian đăng trúng truyện đã được đăng,
          điền tên gốc và link gốc rồi ấn Tiếp theo trước, nếu không bị báo lỗi
          Truyện đã tồn tại trong hệ thống thì mới điền các thông tin còn lại.
        </>
      }
    >
      <CreateBookForm />
    </CardWrapper>
  );
}
