"use client";

import { useBookQuery } from "@/apollo-client/__generated";
import { CardWrapper } from "@/components/card-wrapper";
import { useParams } from "next/navigation";
import { UpdateBookForm } from "./update-book-form";

export default function Page() {
  const params = useParams<{ bookId: string }>();

  const { data, loading } = useBookQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
    skip: !params.bookId,
  });

  return (
    <CardWrapper
      title="Chỉnh sửa truyện"
      description="Thực hiện thay đổi cho truyện của bạn tại đây. Nhấp vào lưu khi bạn hoàn tất."
    >
      {loading || !data?.book ? (
        <div></div>
      ) : (
        <UpdateBookForm initialData={data.book} />
      )}
    </CardWrapper>
  );
}
