import { DataTableViewOptions } from "@/components/data-table-view-options";
import { Table } from "@tanstack/react-table";
import { Input } from "@workspace/ui/components/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export function BooksTableToolbar<TData>({
  table,
  searchValue,
  setSearchValue,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          label="Tìm kiếm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-9 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions
        table={table}
        columnLabels={{
          name: "Tên",
          gender: "Giới tính",
          status: "Trạng thái",
          createdAt: "Ngày tạo",
        }}
      />
    </div>
  );
}
