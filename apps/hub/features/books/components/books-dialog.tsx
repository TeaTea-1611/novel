import React from "react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useDeleteBookMutation } from "@/apollo-client/__generated";
import { toast } from "sonner";
import { BooksUpdateDrawer } from "./books-update-drawer";
import { useBooks } from "../context/books-context";

export const BooksDialog = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useBooks();
  const [deleteBook, { loading: deleteLoading }] = useDeleteBookMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteBook.success ? "success" : "error"](
        data.deleteBook.message,
      );
    },
    update(cache, { data }) {
      if (data?.deleteBook.success && currentRow?.id) {
        const bookId = cache.identify({
          __typename: "Book",
          id: currentRow.id,
        });

        if (bookId) {
          cache.evict({ id: bookId });
          cache.gc();
        }
        setOpen(null);
        setTimeout(() => {
          setCurrentRow(null);
        }, 500);
      }
    },
  });

  return (
    <>
      {currentRow && (
        <>
          <ConfirmDialog
            key="book-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={() => {
              deleteBook({
                variables: {
                  bookId: currentRow.id,
                },
              });
            }}
            className="max-w-md"
            title={`Xóa truyện?`}
            desc={
              <>
                Bạn sắp xóa truyện <strong>{currentRow.name}</strong>. <br />
                Không thể hoàn tác hành động này.
              </>
            }
            isLoading={deleteLoading}
            disabled={deleteLoading}
          />
          <BooksUpdateDrawer
            key={`book-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={() => {
              setOpen("update");
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
};
