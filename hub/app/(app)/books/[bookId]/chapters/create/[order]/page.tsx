"use client";

import { CardWrapper } from "@/components/card-wrapper";
import { useParams } from "next/navigation";
import { CreateChapterForm } from "./craete-chapter-form";

export default function Page() {
  const params = useParams<{ bookId: string; order: string }>();

  return (
    <CardWrapper
      title="Thêm chương mới"
      description={"Điền các thông tin bên dưới để thêm chương mới."}
    >
      <CreateChapterForm
        bookId={parseInt(params.bookId)}
        order={parseInt(params.order)}
      />
    </CardWrapper>
  );
}
