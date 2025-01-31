"use client";

import { useGenresQuery } from "@/apollo-client/__generated";
import { Main } from "@/components/layout/main";
import { columns } from "@/features/genres/components/genres-columns";
import { GenresDialogs } from "@/features/genres/components/genres-dialogs";
import { GenresPrimaryButtons } from "@/features/genres/components/genres-primary-buttons";
import { GenresTable } from "@/features/genres/components/genres-table";
import { GenresProvider } from "@/features/genres/context/genres-context";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { AlertCircle } from "lucide-react";

export default function GenresPage() {
  const { data, loading, error } = useGenresQuery();

  if (loading) {
    return (
      <Main>
        <div className="mb-2 space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-5 w-[300px]" />
        </div>
        <div className="-mx-4 flex-1 space-y-4 overflow-auto px-4 py-1">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>
            {error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau."}
          </AlertDescription>
        </Alert>
      </Main>
    );
  }

  return (
    <GenresProvider>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Thể loại</h2>
            <p className="text-muted-foreground">
              Quản lý danh sách thể loại của truyện tại đây.
            </p>
          </div>
          <div className="flex gap-2">
            <GenresPrimaryButtons />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1">
          {data?.genres ? (
            <GenresTable columns={columns} data={data.genres} />
          ) : (
            <Alert>
              <AlertTitle>Thông báo</AlertTitle>
              <AlertDescription>Không tìm thấy dữ liệu.</AlertDescription>
            </Alert>
          )}
        </div>
      </Main>
      <GenresDialogs />
    </GenresProvider>
  );
}
