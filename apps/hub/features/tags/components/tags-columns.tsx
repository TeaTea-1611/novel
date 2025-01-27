import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { TagFragment } from "@/apollo-client/__generated";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { useTags } from "../context/tags-context";
import { DataTableRowActions } from "@/components/data-table-row-actions";

export const columns: ColumnDef<TagFragment>[] = [
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
      <DataTableColumnHeader column={column} title="Thẻ" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("name")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "groupName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhóm" />
    ),
    cell: ({ row }) => (
      <div
        className="w-fit text-nowrap rounded-lg border px-1.5 py-0.5"
        style={{
          borderColor: row.original.group.color,
          color: row.original.group.color,
        }}
      >
        {row.original.group.name}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return rowA.original.group.name.toLowerCase() >
        rowB.original.group.name.toLowerCase()
        ? 1
        : -1;
    },
  },
  {
    id: "actions",
    cell: TagActions,
  },
];

function TagActions({ row }: { row: Row<TagFragment> }) {
  const { setOpen, setCurrentRow } = useTags();

  return (
    <DataTableRowActions
      row={row}
      onEdit={(tag) => {
        setCurrentRow(tag);
        setOpen("edit");
      }}
      onDelete={(tag) => {
        setCurrentRow(tag);
        setOpen("delete");
      }}
    />
  );
}
