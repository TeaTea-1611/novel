"use client";

import { SortOrder, useMyNovelsQuery } from "@/apollo-client/__generated";
import { Main } from "@/components/layout/main";
import { columns } from "@/features/novels/components/novels-columns";
import { NovelsCreateDrawer } from "@/features/novels/components/novels-create-drawer";
import { NovelsTable } from "@/features/novels/components/novels-table";
import NovelsProvider from "@/features/novels/context/novels-context";
import { useDebounce } from "@/hooks/use-debounce";
import { SortingState } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { PlusIcon } from "lucide-react";
import { Suspense, useState } from "react";

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(20);
  const [sorting, setSorting] = useState<SortingState>([]);
  const debouncedKeyword = useDebounce(keyword, 1000);

  const { data, loading } = useMyNovelsQuery({
    variables: {
      keyword: debouncedKeyword,
      page,
      take,
      sortBy: sorting[0] ? sorting[0].id : null,
      sortOrder: sorting[0]
        ? sorting[0].desc
          ? SortOrder.Desc
          : SortOrder.Asc
        : null,
    },
  });

  const handleSortChange = (sorting: SortingState) => {
    setSorting(sorting);
  };

  return (
    <NovelsProvider>
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Truyện đã đăng
            </h2>
            <p className="text-muted-foreground">
              Đây là danh sách truyện của bạn!
            </p>
          </div>
          <div className="flex gap-2">
            <Suspense fallback={<Skeleton className="h-9 w-[120px]" />}>
              <NovelsCreateDrawer>
                <Button>
                  Thêm mới <PlusIcon className="ml-1" />
                </Button>
              </NovelsCreateDrawer>
            </Suspense>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <NovelsTable
            columns={columns}
            data={data?.myNovels.novels || []}
            onSortingChange={handleSortChange}
            loading={loading}
            toolbar={{
              searchValue: keyword,
              setSearchValue: (value) => setKeyword(value),
            }}
            pagination={{
              page: page,
              setPage: (value) => setPage(value),
              pageSize: take,
              setPageSize: (value) => setTake(value),
              pageCount: data?.myNovels.totalPages,
              nextPage: data?.myNovels.next,
              previousPage: data?.myNovels.prev,
            }}
          />
        </div>
      </Main>
      <NovelDialog />
    </NovelsProvider>
  );
}
