"use client";

import {
  Tag,
  useBookOptionsQuery,
  useUpdateTagMutation,
} from "@/apollo-client/__generated";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableEditInput } from "@/components/data-table-edit-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "./delete-dialog";

export const columns: ColumnDef<Tag>[] = [
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
    meta: {
      headerClassName: "w-12",
    },
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
          className="w-full"
          ascendingLabel="A → Z"
          descendingLabel="Z → A"
        />
      );
    },
    cell: ({ row }) => {
      return <TagName tag={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "group.name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Nhóm"
          className="w-full"
          ascendingLabel="A → Z"
          descendingLabel="Z → A"
        />
      );
    },
    cell: ({ row }) => {
      return <TagGroup tag={row.original} />;
    },
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 size-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
            <DeleteDialog tagIds={[row.original.id]}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <TrashIcon className="mr-2 size-4" />
                Xóa
              </DropdownMenuItem>
            </DeleteDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const TagName = ({ tag }: { tag: Tag }) => {
  const [updateTag, { loading }] = useUpdateTagMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <DataTableEditInput
      initialValue={tag.name}
      loading={loading}
      onSave={(value) => {
        updateTag({
          variables: {
            tagId: tag.id,
            name: value,
            groupId: tag.groupId,
          },
        });
      }}
    />
  );
};

const TagGroup = ({ tag }: { tag: Tag }) => {
  const { data } = useBookOptionsQuery();
  const [updateTag, { loading }] = useUpdateTagMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <Select
      value={tag.group.name}
      onValueChange={(value) => {
        updateTag({
          variables: {
            tagId: tag.id,
            name: tag.name,
            groupId: parseInt(value),
          },
        });
      }}
    >
      <SelectTrigger padding={false}>
        <SelectValue placeholder="Select page size">
          <Badge
            style={{
              color: tag.group.color,
              background: tag.group.bgColor,
            }}
          >
            {loading ? "Đang tải" : tag.group.name}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data?.tagGroups.map((option) => (
          <SelectItem key={option.id} value={String(option.id)}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
