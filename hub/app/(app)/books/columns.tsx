"use client";

import { BookFragment } from "@/apollo-client/__generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Link from "next/link";

const KIND_LABELS = ["Chuyển ngữ", "Sáng tác"];
const STATUS_LABELS = ["Còn tiếp", "Hoàn thành", "Tạm dừng"];

export const columns: ColumnDef<BookFragment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <span className="text-xs">{row.original.id}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Tên"
          ascendingLabel="A → Z"
          descendingLabel="Z → A"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/books/${row.original.id}`}
          className="hover:underline hover:text-primary"
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "readCnt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Lượt đọc" />;
    },
    cell: ({ row }) => {
      return <span className="text-xs">{row.original.readCnt}</span>;
    },
  },
  {
    accessorKey: "kind",
    header: "Loại",
    cell: ({ row }) => {
      return (
        <Badge variant={"outline"}>{KIND_LABELS[row.original.kind - 1]}</Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={
            status === 1 ? "outline" : status === 2 ? "success" : "destructive"
          }
        >
          {STATUS_LABELS[status - 1]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Ngày tạo"
          ascendingLabel="Cũ → Mới"
          descendingLabel="Mới → Cũ"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs">
          {formatDate(new Date(row.original.createdAt), "dd/MM/yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "newChapterAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Chương mới"
          ascendingLabel="Cũ → Mới"
          descendingLabel="Mới → Cũ"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-xs">
          {formatDate(new Date(row.original.createdAt), "dd/MM/yyyy")}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 size-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(book.id.toString())}
            >
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/books/${book.id}`}>Xem chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
