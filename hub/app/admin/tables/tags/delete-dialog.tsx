"use client";

import { useDeleteTagsMutation } from "@/apollo-client/__generated";
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
  tagIds: number[];
  children: React.ReactNode;
}

export const DeleteDialog = ({ tagIds, children }: Props) => {
  const [deleteTags, { loading, client }] = useDeleteTagsMutation({
    variables: {
      tagIds: tagIds,
    },
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteTags.success ? "success" : "error"](
        data.deleteTags.message,
      );
      if (data.deleteTags.success) {
        tagIds.forEach((tagId) => client.cache.evict({ id: `Tag:${tagId}` }));
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
            Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn dữ
            liệu này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            onClick={(e) => e.stopPropagation()}
          >
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={() => {
              deleteTags();
            }}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
