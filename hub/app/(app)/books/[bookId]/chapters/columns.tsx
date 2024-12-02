"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { Chapter } from "@/apollo-client/generated";

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <button {...attributes} {...listeners}>
      🟰
    </button>
  );
};

export const columns: ColumnDef<Chapter>[] = [
  {
    id: "drag-handle",
    header: "Move",
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
    size: 60,
  },
  {
    accessorKey: "order",
    header: "#",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "title",
    header: "Tên chương",
    cell: (info) => info.getValue(),
  },
];
