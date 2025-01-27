import { Genre } from "@/apollo-client/__generated";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { useGenres } from "../context/genres-context";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<Genre>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thể loại" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("name")}</div>
    ),
    enableHiding: false,
  },
  {
    id: "actions",
    cell: GenreActions,
  },
];

function GenreActions({ row }: { row: Row<Genre> }) {
  const { setOpen, setCurrentRow } = useGenres();

  return (
    <DataTableRowActions
      row={row}
      onEdit={(genre) => {
        setCurrentRow(genre);
        setOpen("edit");
      }}
      onDelete={(genre) => {
        setCurrentRow(genre);
        setOpen("delete");
      }}
    />
  );
}
