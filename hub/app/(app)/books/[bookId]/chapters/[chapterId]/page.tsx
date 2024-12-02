"use client";

import { CardWrapper } from "@/components/card-wrapper";
import { useParams } from "next/navigation";
import { CreateChapterForm } from "./craete-chapter-form";

export default function Page() {
  const params = useParams<{ bookId: string; chapterId: string }>();

  return (
    <CardWrapper
      title="Chỉnh sửa"
      description={"Chỉnh sửa thông tin chương truyện."}
    >
      <CreateChapterForm
        bookId={parseInt(params.bookId)}
        order={parseInt(params.chapterId)}
      />
    </CardWrapper>
  );
}
