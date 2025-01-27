"use client";

import { Main } from "@/components/layout/main";
import { BooksCreateForm } from "@/features/books/components/books-create-form";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Main>
      <div className="rounded-lg border p-4 hover:shadow-md">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Thêm truyện mới
            </h2>
            <p className="text-muted-foreground">
              Thêm truyện mới bằng cách cung cấp thông tin cần thiết. Nhấp vào
              lưu khi bạn hoàn tất.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Suspense
            fallback={
              <div className="flex flex-col gap-8">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-9 w-20" />
              </div>
            }
          >
            <BooksCreateForm />
          </Suspense>
        </div>
      </div>
    </Main>
  );
}
