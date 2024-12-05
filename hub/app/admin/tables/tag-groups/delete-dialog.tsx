"use client";

import { useDeleteTagGroupsMutation } from "@/apollo-client/__generated";
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
  tagGroupIds: number[];
  children: React.ReactNode;
}

export const DeleteDialog = ({ tagGroupIds, children }: Props) => {
  const [deleteTagGroups, { loading, client }] = useDeleteTagGroupsMutation({
    variables: {
      tagGroupIds: tagGroupIds,
    },
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteTagGroups.success ? "success" : "error"](
        data.deleteTagGroups.message,
      );
      if (data.deleteTagGroups.success) {
        tagGroupIds.forEach((tagGroupId) =>
          client.cache.evict({ id: `TagGroup:${tagGroupId}` }),
        );
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
              deleteTagGroups();
            }}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
