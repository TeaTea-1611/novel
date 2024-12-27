"use client";

import { useChaptersLazyQuery } from "@/apollo-client/__generated";
import { buttonVariants } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  bookId: number;
  bookName: string;
  children: React.ReactNode;
}

export function CommentsSheet({ bookId, bookName, children }: Props) {
  const [open, setOpen] = useState(false);
  const [query, { data, loading }] = useChaptersLazyQuery();

  useEffect(() => {
    if (open) {
      query({
        variables: {
          bookId,
        },
      });
    }
  }, [open, bookId, query]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="max-w-full p-4 overflow-y-auto md:max-w-md lg:max-w-lg">
        <SheetHeader>
          <div className="flex justify-between">
            <SheetTitle className="text-base leading-5 line-clamp-2">
              {bookName}
            </SheetTitle>
            <SheetClose
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "size-8 p-2",
                }),
              )}
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <SheetDescription>Thảo luận</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          {loading ? (
            <>
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-14" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-14" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-14" />
            </>
          ) : !data?.chapters ? (
            <div className="flex items-center justify-center w-full h-24">
              <span className="text-lg text-muted-foreground">
                Không có chương
              </span>
            </div>
          ) : (
            data.chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/books/${bookId}/${chapter.order}`}
                className="flex flex-col gap-1 p-2 rounded-md hover:bg-accent"
              >
                <h3 className="text-sm line-clamp-2 text-primary">
                  Chương {chapter.order}: {chapter.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  Ngày tạo:{" "}
                  {formatDistanceToNow(new Date(chapter.createdAt), {
                    locale: vi,
                    addSuffix: true,
                  })}{" "}
                  - Mới cập nhật{" "}
                  {formatDistanceToNow(new Date(chapter.updatedAt), {
                    locale: vi,
                    addSuffix: true,
                  })}
                </span>
              </Link>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
