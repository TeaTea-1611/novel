import { useTagGroups } from "../context/tag-groups-context";
import { TagGroupsActionDialog } from "./tag-groups-action-dialog";
import { TagGroupsDeleteDialog } from "./tag-groups-delete-dialog";

export function TagGroupsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, rowSelection } =
    useTagGroups();
  return (
    <>
      <TagGroupsActionDialog
        key="tag-groups-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      <TagGroupsDeleteDialog
        key={`tag-groups-multi-delete`}
        type="multi"
        open={open === "multi-delete"}
        onOpenChange={() => {
          setOpen("multi-delete");
        }}
        rowSelection={rowSelection}
      />
      {currentRow && (
        <>
          <TagGroupsActionDialog
            key={`tag-groups-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
          <TagGroupsDeleteDialog
            key={`tag-groups-delete-${currentRow.id}`}
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
