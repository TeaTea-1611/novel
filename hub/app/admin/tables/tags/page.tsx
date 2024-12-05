"use client";

import { useBookOptionsQuery } from "@/apollo-client/__generated";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Page() {
  const { data, loading } = useBookOptionsQuery();

  return (
    <div className="p-4 mx-auto rounded-md shadow-md bg-card">
      {loading || !data ? (
        <div className="space-y-4">
          <Skeleton className="h-11 w-96" />
          <Skeleton className="w-full h-96" />
        </div>
      ) : (
        <DataTable columns={columns} data={data.tags} />
      )}
    </div>
  );
}
