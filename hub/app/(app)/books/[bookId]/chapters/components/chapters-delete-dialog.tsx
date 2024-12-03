"use client";

import { useDeleteChaptersMutation } from "@/apollo-client/__generated";
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
import { gql, Reference } from "@apollo/client";
import { toast } from "sonner";

interface Props {
  bookId: number;
  chapterIds: number[];
  children: React.ReactNode;
}

export const ChaptersDeleteDialog = ({
  bookId,
  chapterIds,
  children,
}: Props) => {
  const [deleteChapters, { loading, client }] = useDeleteChaptersMutation({
    variables: {
      bookId,
      chapterIds,
    },
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      toast[data.deleteChapters.success ? "success" : "error"](
        data.deleteChapters.message,
      );
      if (data.deleteChapters.success) {
        client.cache.modify({
          fields: {
            chapters(existingChaptersRef = [], { readField }) {
              const deletedOrders = chapterIds
                .map((id) => {
                  const chapter = existingChaptersRef.find(
                    (chapterRef: Reference) =>
                      readField<number>("id", chapterRef) === id,
                  );
                  return chapter ? readField<number>("order", chapter) : null;
                })
                .filter((order): order is number => order !== null);

              return existingChaptersRef.map((chapterRef: Reference) => {
                const chapterOrder = readField<number>("order", chapterRef);
                if (
                  chapterOrder &&
                  deletedOrders.some((order) => chapterOrder > order)
                ) {
                  return client.cache.writeFragment({
                    id: chapterRef.__ref,
                    fragment: gql`
                      fragment UpdateOrder on Chapter {
                        order
                      }
                    `,
                    data: {
                      order:
                        chapterOrder -
                        deletedOrders.filter((order) => chapterOrder > order)
                          .length,
                    },
                  });
                }

                return chapterRef;
              });
            },
          },
        });

        chapterIds.forEach((id) => client.cache.evict({ id: `Chapter:${id}` }));
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
            Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn{" "}
            {chapterIds.length} chương này.
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
              deleteChapters();
            }}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
