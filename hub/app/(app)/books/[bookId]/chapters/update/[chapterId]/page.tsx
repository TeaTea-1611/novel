"use client";

import { useChapterQuery } from "@/apollo-client/__generated";
import { CardWrapper } from "@/components/card-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { UpdateChapterForm } from "./update-chapter-form";

export default function Page() {
  const params = useParams<{ bookId: string; chapterId: string }>();

  const { data, loading } = useChapterQuery({
    variables: { chapterId: parseInt(params.chapterId) },
  });

  const content = loading ? (
    <div className="space-y-8">
      <Skeleton className="w-full h-11" />
      <Skeleton className="w-full h-96" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
      </div>
    </div>
  ) : !data?.chapter ? (
    <div className="flex items-center justify-center h-24">
      <span className="text-lg text-muted-foreground">
        Không tìm thấy chương
      </span>
    </div>
  ) : (
    <UpdateChapterForm initialData={data.chapter} />
  );

  return (
    <CardWrapper
      title="Chỉnh sửa"
      description={"Chỉnh sửa thông tin chương truyện."}
    >
      {content}
    </CardWrapper>
  );
}
