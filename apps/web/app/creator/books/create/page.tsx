"use client";

import { useBookOptionsQuery } from "@/apollo-client/__generated";
import { CreateBookForm } from "./create-book-form";
import { Skeleton } from "@workspace/ui/components/skeleton";

export default function Page() {
  const { data, loading } = useBookOptionsQuery();

  return (
    <div className="p-4 bg-card border rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Thêm truyện mới</h1>
      {loading ? (
        <div className="flex flex-col gap-8">
          <Skeleton className="w-full h-11" />
          <Skeleton className="w-full h-11" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-11" />
          <Skeleton className="w-full h-14" />
        </div>
      ) : !data ? (
        <p className="text-muted-foreground">Không có dữ liệu</p>
      ) : (
        <CreateBookForm {...data} />
      )}
    </div>
  );
}
