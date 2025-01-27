"use client";

import { SortOrder, useCreatedBooksQuery } from "@/apollo-client/__generated";
import { Main } from "@/components/layout/main";
import { columns } from "@/features/books/components/books-columns";
import { BooksCreateDrawer } from "@/features/books/components/books-create-drawer";
import { BooksDialog } from "@/features/books/components/books-dialog";
import { BooksTable } from "@/features/books/components/books-table";
import BooksProvider from "@/features/books/context/books-context";
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

  const { data, loading } = useCreatedBooksQuery({
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
    <BooksProvider>
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
              <BooksCreateDrawer>
                <Button>
                  Thêm mới <PlusIcon className="ml-1" />
                </Button>
              </BooksCreateDrawer>
            </Suspense>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <BooksTable
            columns={columns}
            data={data?.createdBooks.books || []}
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
              pageCount: data?.createdBooks.totalPages,
              nextPage: data?.createdBooks.next,
              previousPage: data?.createdBooks.prev,
            }}
          />
        </div>
      </Main>
      <BooksDialog />
    </BooksProvider>
  );
}
