"use client";

import { SortOrder, useCreatedBooksQuery } from "@/apollo-client/__generated";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { usePathname, useSearchParams } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const take = parseInt(searchParams.get("take") || "10");
  const keyword = searchParams.get("keyword") || "";
  const sortBy = searchParams.get("sort-by");

  const sortOrder = searchParams.get("sort-order");

  const { data, loading } = useCreatedBooksQuery({
    variables: {
      page,
      take,
      keyword: keyword || "",
      sortBy,
      sortOrder: sortOrder as SortOrder,
    },
  });

  const totalCount = data?.createdBooks.total || 0;
  const totalPageCount = Math.ceil(totalCount / take);

  return (
    <div className="p-4 mx-auto rounded-md shadow-md bg-card">
      <DataTable
        columns={columns}
        data={data?.createdBooks.books || []}
        loading={loading}
        totalPageCount={totalPageCount}
        keyword={keyword}
        page={page}
        take={take}
        sortBy={sortBy}
        sortOrder={sortOrder}
        pathname={pathname}
        searchParams={searchParams}
      />
    </div>
  );
}
