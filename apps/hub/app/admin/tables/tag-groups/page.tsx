"use client";

import { useBookOptionsQuery } from "@/apollo-client/__generated";
import { Main } from "@/components/layout/main";
import { columns } from "@/features/tag-groups/components/tag-groups-columns";
import { TagGroupsDialogs } from "@/features/tag-groups/components/tag-groups-dialogs";
import { TagGroupsPrimaryButtons } from "@/features/tag-groups/components/tag-groups-primary-buttons";
import { TagGroupsTable } from "@/features/tag-groups/components/tag-groups-table";
import { TagGroupsProvider } from "@/features/tag-groups/context/tag-groups-context";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { AlertCircle } from "lucide-react";

export default function TagsPage() {
  const { data, loading, error } = useBookOptionsQuery();

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
    <TagGroupsProvider>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Nhóm thẻ</h2>
            <p className="text-muted-foreground">
              Quản lý danh sách nhóm thẻ của truyện tại đây.
            </p>
          </div>
          <div className="flex gap-2">
            <TagGroupsPrimaryButtons />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1">
          {data?.tags ? (
            <TagGroupsTable columns={columns} data={data.tagGroups} />
          ) : (
            <Alert>
              <AlertTitle>Thông báo</AlertTitle>
              <AlertDescription>Không tìm thấy dữ liệu.</AlertDescription>
            </Alert>
          )}
        </div>
      </Main>
      <TagGroupsDialogs />
    </TagGroupsProvider>
  );
}
