import { Table } from "@tanstack/react-table";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { TrashIcon } from "lucide-react";
import {
  DataTableViewOptions,
  DataTableViewOptionsProps,
} from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: string;
  onMultiDelete?: () => void;
  labels?: {
    filter: string;
    delete: string;
    selectedRows: string;
  };
  viewOptions: DataTableViewOptionsProps<TData>;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn = "name",
  onMultiDelete,
  labels = {
    filter: "Lọc...",
    delete: "Xóa",
    selectedRows: "dòng",
  },
  viewOptions,
}: DataTableToolbarProps<TData>) {
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;
  const filterValue =
    (table.getColumn(filterColumn)?.getFilterValue() as string) ?? "";

  const handleFilterChange = (value: string) => {
    table.getColumn(filterColumn)?.setFilterValue(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          label={labels.filter}
          value={filterValue}
          onChange={(event) => handleFilterChange(event.target.value)}
          className="h-9 w-[150px] lg:w-[250px]"
        />
      </div>
      {!!selectedRowCount && onMultiDelete && (
        <Button
          variant="destructive"
          size="sm"
          className="ml-auto mr-2 hidden h-8 lg:flex"
          onClick={onMultiDelete}
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          {labels.delete} ({selectedRowCount} {labels.selectedRows})
        </Button>
      )}
      <DataTableViewOptions {...viewOptions} />
    </div>
  );
}
