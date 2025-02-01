import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import * as React from "react";
import {
  BooksTablePagination,
  BooksTablePaginationProps,
} from "./novels-table-pagination";
import { BooksTableToolbar } from "./novels-table-toolbar.js";
import { NovelFragment } from "@/apollo-client/__generated";

interface DataTableProps {
  columns: ColumnDef<NovelFragment>[];
  data: NovelFragment[];
  toolbar: {
    searchValue: string;
    setSearchValue: (value: string) => void;
  };
  onSortingChange?: (sorting: SortingState) => void;
  loading: boolean;
  pagination: BooksTablePaginationProps;
}

export function NovelsTable({
  columns,
  data,
  onSortingChange,
  loading,
  toolbar,
  pagination,
}: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updatedSorting) => {
      setSorting(updatedSorting);
      if (onSortingChange) {
        onSortingChange(updatedSorting as SortingState);
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <BooksTableToolbar table={table} {...toolbar} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="group/row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ""}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group/row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className ?? ""}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  {loading ? "Đang tải dữ liệu..." : "Không có dữ liệu."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <BooksTablePagination {...pagination} />
    </div>
  );
}
