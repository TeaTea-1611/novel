import { useGenres } from "../context/genres-context";
import { GenresActionDialog } from "./genres-action-dialog";
import { GenresDeleteDialog } from "./genres-delete-dialog";

export function GenresDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, rowSelection } =
    useGenres();
  return (
    <>
      <GenresActionDialog
        key="genres-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      <GenresDeleteDialog
        key={`genres-multi-delete`}
        type="multi"
        open={open === "multi-delete"}
        onOpenChange={() => {
          setOpen("multi-delete");
        }}
        rowSelection={rowSelection}
      />
      {currentRow && (
        <>
          <GenresActionDialog
            key={`genres-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
          <GenresDeleteDialog
            key={`genres-delete-${currentRow.id}`}
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
