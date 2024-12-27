"use client";

import { useChapterByBookAndOrderQuery } from "@/apollo-client/__generated";
import { useParams } from "next/navigation";
import Chapter from "./chapter";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Separator } from "@workspace/ui/components/separator";
import Link from "next/link";
import { buttonVariants } from "@workspace/ui/components/button";

export default function Page() {
  const { bookId, chapterOrder } = useParams<{
    bookId: string;
    chapterOrder: string;
  }>();

  const { data, loading } = useChapterByBookAndOrderQuery({
    variables: {
      bookId: parseInt(bookId),
      order: parseInt(chapterOrder),
    },
    skip: !bookId || !chapterOrder,
  });

  if (loading) {
    return (
      <div className="flex flex-col border bg-card rounded-xl">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <Skeleton className="w-2/3 h-7" />
          <Skeleton className="w-1/3 h-6" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
        <Separator />
        <Skeleton className="w-full m-2 h-96 sm:m-4" />
      </div>
    );
  }

  if (!data?.chapterByBookAndOrder) {
    return (
      <div className="flex flex-col items-center justify-center h-56 gap-2 border bg-card rounded-xl">
        <span className="text-lg text-muted-foreground">
          Không tìm thấy chương.
        </span>
        <Link
          href={`/books/${bookId}`}
          className={buttonVariants({ variant: "linkHover2" })}
        >
          Quay lại trang truyện
        </Link>
      </div>
    );
  }

  return <Chapter chapter={data.chapterByBookAndOrder} />;
}
