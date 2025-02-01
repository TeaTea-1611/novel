import { NovelFragment } from "@/apollo-client/__generated";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import LongText from "@/components/long-text";
import { genders } from "@/data/genders";
import { status as statuses } from "@/data/status";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { format } from "date-fns";
import { EllipsisIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useNovels } from "../context/novels-context";

export const columns: ColumnDef<NovelFragment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "w-10",
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-40 truncate font-medium sm:max-w-72 md:max-w-2xl">
          <Link
            href={`/books/${row.getValue("id")}`}
            className="hover:underline"
          >
            {row.getValue("name")}
          </Link>
        </LongText>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giới tính" />
    ),
    cell: ({ row }) => {
      const gender = genders.find(
        (gender) => gender.value === row.getValue("gender"),
      );

      if (!gender) {
        return null;
      }

      return <span className="text-muted-foreground">{gender.label}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),

    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy")}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

interface DataTableRowActionsProps {
  row: Row<NovelFragment>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const book = row.original;

  const { setOpen, setCurrentRow } = useNovels();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <EllipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={`/books/${book.id}`}>Chi tiết</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(book);
            setOpen("update");
          }}
        >
          Chỉnh sửa
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(book);
            setOpen("delete");
          }}
        >
          Xóa
          <DropdownMenuShortcut>
            <TrashIcon className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
