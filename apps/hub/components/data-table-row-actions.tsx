import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Button } from "@workspace/ui/components/button";
import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";

interface RowActionsProps<T> {
  row: Row<T>;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  labels?: {
    edit?: string;
    delete?: string;
    menu?: string;
  };
}

export function DataTableRowActions<T>({
  row,
  onEdit,
  onDelete,
  labels = {
    edit: "Chỉnh sửa",
    delete: "Xóa",
    menu: "Open menu",
  },
}: RowActionsProps<T>) {
  const handleEdit = () => onEdit(row.original);
  const handleDelete = () => onDelete(row.original);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <EllipsisIcon className="h-4 w-4" />
          <span className="sr-only">{labels.menu}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>
          {labels.edit}
          <DropdownMenuShortcut>
            <EditIcon size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          {labels.delete}
          <DropdownMenuShortcut>
            <TrashIcon size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
