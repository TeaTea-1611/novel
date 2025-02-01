import React from "react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useDeleteNovelMutation } from "@/apollo-client/__generated";
import { toast } from "sonner";
import { NovelsUpdateDrawer } from "./novels-update-drawer";
import { useNovels } from "../context/novels-context";

export const NovelsDialog = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useNovels();
  const [deleteNovel, { loading: deleteLoading }] = useDeleteNovelMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteNovel.success ? "success" : "error"](
        data.deleteNovel.message,
      );
    },
    update(cache, { data }) {
      if (data?.deleteNovel.success && currentRow?.id) {
        const novelId = cache.identify({
          __typename: "Novel",
          id: currentRow.id,
        });

        if (novelId) {
          cache.evict({ id: novelId });
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
            key="novel-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={() => {
              deleteNovel({
                variables: {
                  novelId: currentRow.id,
                },
              });
            }}
            className="max-w-md"
            title={`Xóa truyện?`}
            desc={
              <>
                Bạn sắp xóa truyện <strong>{currentRow.title}</strong>. <br />
                Không thể hoàn tác hành động này.
              </>
            }
            isLoading={deleteLoading}
            disabled={deleteLoading}
          />
          <NovelsUpdateDrawer
            key={`novel-update-${currentRow.id}`}
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
