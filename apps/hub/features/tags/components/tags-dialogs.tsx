import { useTags } from "../context/tags-context";
import { TagsActionDialog } from "./tags-action-dialog";
import { TagsDeleteDialog } from "./tags-delete-dialog";

export function TagsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, rowSelection } = useTags();
  return (
    <>
      <TagsActionDialog
        key="tags-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      <TagsDeleteDialog
        key={`tags-multi-delete`}
        type="multi"
        open={open === "multi-delete"}
        onOpenChange={() => {
          setOpen("multi-delete");
        }}
        rowSelection={rowSelection}
      />
      {currentRow && (
        <>
          <TagsActionDialog
            key={`tags-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
          <TagsDeleteDialog
            key={`tags-delete-${currentRow.id}`}
            type="single"
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
