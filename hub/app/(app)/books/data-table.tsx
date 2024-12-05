"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { type ReadonlyURLSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DataTableViewOptions } from "@/components/data-table-view-options";

const PAGE_SIZES = [10, 15, 20, 25, 30, 50];
const MAX_VISIBLE_PAGES = 5;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  totalPageCount: number;
  keyword: string | null;
  page: number;
  take: number;
  sortBy: string | null;
  sortOrder: string | null;
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  page,
  take,
  keyword,
  totalPageCount,
  sortBy,
  sortOrder,
  searchParams,
  pathname,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [value, setValue] = useState(keyword);
  const debouncedValue = useDebounce(value, 1000);
  const [sorting, setSorting] = useState<SortingState>(
    sortBy && sortOrder ? [{ id: sortBy, desc: sortOrder === "desc" }] : [],
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {},
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const updateUrlParams = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const paramsChanged = Object.entries(params).some(([key, value]) => {
        return current.get(key) !== value;
      });

      if (paramsChanged) {
        Object.entries(params).forEach(([key, value]) => {
          current.set(key, value);
        });

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
      }
    },
    [searchParams, router, pathname],
  );

  useEffect(() => {
    if (typeof debouncedValue === "string")
      updateUrlParams({
        keyword: debouncedValue,
      });
  }, [debouncedValue, updateUrlParams]);

  useEffect(() => {
    if (sorting.length) {
      updateUrlParams({
        "sort-by": sorting[0].id,
        "sort-order": sorting[0].desc ? "desc" : "asc",
      });
    }
  }, [sorting, updateUrlParams]);

  const renderPageNumbers = useMemo(() => {
    const items: React.ReactNode[] = [];

    if (totalPageCount <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPageCount }, (_, i) => (
        <PaginationItem key={i + 1}>
          <PaginationLink isActive={page === i + 1} asChild>
            <Link
              href={"#"}
              onClick={(e) => {
                e.preventDefault();
                updateUrlParams({ page: String(i + 1) });
              }}
            >
              {i + 1}
            </Link>
          </PaginationLink>
        </PaginationItem>
      ));
    }

    // First page always shown
    items.push(
      <PaginationItem key={1}>
        <PaginationLink isActive={page === 1} asChild>
          <Link
            href={"#"}
            onClick={(e) => {
              e.preventDefault();
              updateUrlParams({ page: "1" });
            }}
          >
            1
          </Link>
        </PaginationLink>
      </PaginationItem>,
    );

    // Context-aware middle page rendering
    if (page > 3) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPageCount - 1, page + 1);

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={page === i} asChild>
            <Link
              href={"#"}
              onClick={(e) => {
                e.preventDefault();
                updateUrlParams({ page: String(i) });
              }}
            >
              {i}
            </Link>
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (page < totalPageCount - 2) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Last page always shown
    items.push(
      <PaginationItem key={totalPageCount}>
        <PaginationLink isActive={page === totalPageCount} asChild>
          <Link
            href={"#"}
            onClick={(e) => {
              e.preventDefault();
              updateUrlParams({ page: String(totalPageCount) });
            }}
          >
            {totalPageCount}
          </Link>
        </PaginationLink>
      </PaginationItem>,
    );

    return items;
  }, [page, totalPageCount, updateUrlParams]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            label="Tìm..."
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
          />
          <Select
            value={String(take)}
            onValueChange={(value) => {
              updateUrlParams({ page: "1", take: value });
            }}
          >
            <SelectTrigger label="Số dòng" className="w-48">
              <SelectValue placeholder="Select page size">{take}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTableViewOptions
          table={table}
          columnConfig={{
            name: "Tên",
            readCnt: "Lượt đọc",
            kind: "Loại",
            status: "Trạng thái",
            createdAt: "Ngày tạo",
            newChapterAt: "Chương mới",
          }}
        />
      </div>
      <div className="text-sm border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center"
                  style={{
                    height: 56 * take + "px",
                  }}
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-14 ">
                        <span className="line-clamp-1">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {[...Array(take - table.getRowModel().rows.length)].map(
                  (_, i) => (
                    <TableRow
                      key={i}
                      className="border-transparent h-14"
                    ></TableRow>
                  ),
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center"
                  style={{
                    height: 56 * take + "px",
                  }}
                >
                  Không có sách nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground"></div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink asChild>
                  <Link
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      updateUrlParams({
                        page: page <= 1 ? String(page) : String(page - 1),
                      });
                    }}
                  >
                    <ChevronLeft />
                  </Link>
                </PaginationLink>
              </PaginationItem>
              {renderPageNumbers}
              <PaginationItem>
                <PaginationLink asChild>
                  <Link
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      updateUrlParams({
                        page:
                          page >= totalPageCount
                            ? String(page)
                            : String(page + 1),
                      });
                    }}
                  >
                    <ChevronRight />
                  </Link>
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
