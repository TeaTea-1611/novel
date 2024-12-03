"use client";

import { useChaptersQuery } from "@/apollo-client/__generated";
import { useParams } from "next/navigation";
import { ChapterSwapList } from "../components/chapter-list";
import { CardWrapper } from "@/components/card-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const params = useParams<{ bookId: string }>();
  const { data, loading } = useChaptersQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
    skip: !params.bookId,
  });

  const content =
    loading || !data ? (
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Skeleton className="w-56 h-9" />
          <div className="flex items-center space-x-2">
            <Skeleton className="size-9" />
            <Skeleton className="w-32 h-9" />
          </div>
        </div>
        <div className="space-y-8">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>
    ) : (
      <ChapterSwapList
        bookId={parseInt(params.bookId)}
        initialData={data.chapters.map((chapter) => ({
          ...chapter,
          newOrder: chapter.order,
        }))}
      />
    );

  return (
    <CardWrapper
      title="Sắp xếp chương"
      description={
        <>
          Kéo và thả để thay đổi thứ tự các chương. Các chương được đánh dấu màu
          xanh là các chương có thứ tự mới.
          <br />
          Khi ấn Lưu thay đổi bạn sẽ không thể hoàn tác
        </>
      }
    >
      {content}
    </CardWrapper>
  );
}
