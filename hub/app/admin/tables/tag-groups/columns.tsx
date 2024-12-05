"use client";

import {
  TagGroup,
  useUpdateTagGroupMutation,
} from "@/apollo-client/__generated";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableEditInput } from "@/components/data-table-edit-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "./delete-dialog";

export const columns: ColumnDef<TagGroup>[] = [
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
      return <TagGroupName tagGroup={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Màu chữ"
          className="w-full"
        />
      );
    },
    cell: ({ row }) => {
      return <TagGroupColor tagGroup={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "bgColor",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Màu nền"
          className="w-full"
        />
      );
    },
    cell: ({ row }) => {
      return <TagGroupBgColor tagGroup={row.original} />;
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
            <DeleteDialog tagGroupIds={[row.original.id]}>
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

const TagGroupName = ({ tagGroup }: { tagGroup: TagGroup }) => {
  const [updateTagGroup, { loading }] = useUpdateTagGroupMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <DataTableEditInput
      initialValue={tagGroup.name}
      loading={loading}
      onSave={(value) => {
        updateTagGroup({
          variables: {
            tagGroupId: tagGroup.id,
            name: value,
            color: tagGroup.color,
            bgColor: tagGroup.bgColor,
          },
        });
      }}
    />
  );
};

const TagGroupColor = ({ tagGroup }: { tagGroup: TagGroup }) => {
  const [updateTagGroup, { loading }] = useUpdateTagGroupMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <DataTableEditInput
      initialValue={tagGroup.color}
      loading={loading}
      onSave={(value) => {
        updateTagGroup({
          variables: {
            tagGroupId: tagGroup.id,
            name: tagGroup.name,
            color: value,
            bgColor: tagGroup.bgColor,
          },
        });
      }}
      style={{ color: tagGroup.color, background: tagGroup.bgColor }}
    />
  );
};

const TagGroupBgColor = ({ tagGroup }: { tagGroup: TagGroup }) => {
  const [updateTagGroup, { loading }] = useUpdateTagGroupMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <DataTableEditInput
      initialValue={tagGroup.bgColor}
      loading={loading}
      onSave={(value) => {
        updateTagGroup({
          variables: {
            tagGroupId: tagGroup.id,
            name: tagGroup.name,
            color: tagGroup.color,
            bgColor: value,
          },
        });
      }}
      style={{
        color: tagGroup.color,
        background: tagGroup.bgColor,
      }}
    />
  );
};
