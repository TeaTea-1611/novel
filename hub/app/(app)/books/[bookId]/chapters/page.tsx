"use client";

import { useChaptersQuery } from "@/apollo-client/__generated";
import { CardWrapper } from "@/components/card-wrapper";
import { useParams } from "next/navigation";
import { ChapterList } from "./components/chapter-list";
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
        <div className="flex items-center justify-between">
          <Skeleton className="h-11 w-80" />
          <div className="flex items-center space-x-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="w-20 h-8" />
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
      <ChapterList bookId={parseInt(params.bookId)} data={data.chapters} />
    );

  return (
    <CardWrapper
      title="Danh sách chương"
      description={`${data?.chapters.length || 0} Chương`}
    >
      {content}
    </CardWrapper>
  );
}
