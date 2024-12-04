"use client";

import { useDeleteBookMutation } from "@/apollo-client/__generated";
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
import { useRouter } from "next/navigation";
import { usePageTrackerStore } from "react-page-tracker";
import { toast } from "sonner";

interface Props {
  bookId: number;
  children: React.ReactNode;
}

export const BookDeleteDialog = ({ bookId, children }: Props) => {
  const router = useRouter();
  const isFirstPage = usePageTrackerStore((state) => state.isFirstPage);

  const [deleteBook, { loading, client }] = useDeleteBookMutation({
    variables: {
      bookId,
    },
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteBook.success ? "success" : "error"](
        data.deleteBook.message,
      );
      if (data.deleteBook.success) {
        client.cache.evict({ id: `Book:${bookId}` });
        client.cache.gc();
        if (isFirstPage) {
          router.replace("/books");
        } else {
          router.back();
        }
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
            truyện này.
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
              deleteBook();
            }}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
