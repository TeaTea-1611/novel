import { Table } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Settings2Icon } from "lucide-react";

export interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  columnLabels?: Record<string, string>;
  labels?: {
    toggle?: string;
    title?: string;
  };
  className?: string;
}

export function DataTableViewOptions<TData>({
  table,
  columnLabels = {},
  labels = {
    toggle: "Hiện",
    title: "Chuyển đổi cột",
  },
  className = "ml-auto hidden h-8 lg:flex",
}: DataTableViewOptionsProps<TData>) {
  const toggleableColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  const getColumnLabel = (columnId: string) => {
    return columnLabels[columnId] || columnId;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Settings2Icon className="mr-2 h-4 w-4" />
          {labels.toggle}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>{labels.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {toggleableColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {getColumnLabel(column.id)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
