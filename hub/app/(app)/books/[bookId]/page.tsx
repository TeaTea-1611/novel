"use client";

import { useBookQuery } from "@/apollo-client/__generated";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FilePenLineIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Book } from "./book";
import { BookDeleteDialog } from "./components/book-delete-dialog";

export default function Page() {
  const params = useParams<{ bookId: string }>();

  const { data, loading } = useBookQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
    skip: !parseInt(params.bookId),
  });

  return (
    <div className="relative flex-1 p-4 border rounded-lg shadow-md bg-card">
      {loading || !data?.book ? (
        <div className="space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <Skeleton className="w-40 mx-auto rounded-md h-60" />
            <div className="flex flex-col items-center flex-1 space-y-4 text-sm text-muted-foreground lg:items-start">
              <Skeleton className="w-3/4 h-8" />
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </div>
          <Skeleton className="w-full rounded-md h-60" />
        </div>
      ) : (
        <>
          <div className="absolute flex items-center space-x-2 top-4 right-4">
            <BookDeleteDialog bookId={data.book.id}>
              <Button variant="destructive" className="size-8">
                <TrashIcon className="size-4" />
              </Button>
            </BookDeleteDialog>
            <Link
              href={`/books/${data.book.id}/update`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "h-8",
              )}
            >
              <FilePenLineIcon className="mr-2 size-4" />
              Chỉnh sửa
            </Link>
          </div>
          <Book book={data.book} />
        </>
      )}
    </div>
  );
}
