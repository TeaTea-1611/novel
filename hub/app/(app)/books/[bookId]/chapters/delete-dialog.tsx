"use client";

import { useDeleteChapterMutation } from "@/apollo-client/__generated";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Props {
  chapterId: number;
  children: React.ReactNode;
}

export const DeleteDialog = ({ chapterId, children }: Props) => {
  const [deleteChapter, { loading, client }] = useDeleteChapterMutation({
    variables: {
      chapterId,
    },
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteChapter.success ? "success" : "error"](
        data.deleteChapter.message,
      );
      if (data.deleteChapter.success) {
        client.cache.evict({ id: `Chapter:${chapterId}` });
        client.cache.gc();
      }
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc?</AlertDialogTitle>
          <AlertDialogDescription>
            Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn
            chương này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              deleteChapter();
            }}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
