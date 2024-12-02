"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import {
  AlignLeftIcon,
  CalendarIcon,
  FilePenLineIcon,
  LockIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { type Chapter } from "./chapters";
import { DeleteDialog } from "./delete-dialog";

interface Props {
  chapter: Chapter;
}

export function Chapter({ chapter }: Props) {
  return (
    <div className="p-2 space-y-2 border rounded-md shadow bg-background border-input sortable-item">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 duration-200 transform">
          <div className="flex items-center h-6 p-1 text-xs border rounded-md bg-primary text-primary-foreground">
            <AlignLeftIcon className="mr-2 size-3" />
            Chương {chapter.order}
          </div>
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <LockIcon className="mr-2 size-3" />
            {chapter.unlockPrice}
          </div>
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <CalendarIcon className="mr-2 size-3" />
            {formatDate(new Date(chapter.publishAt), "dd/MM/yyyy")}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/books/${chapter.bookId}/chapters/update/${chapter.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "h-6 p-1 text-xs",
            )}
          >
            <FilePenLineIcon className="mr-2 size-3" />
            Chỉnh sửa
          </Link>
          <DeleteDialog chapterId={chapter.id}>
            <Button variant={"destructive"} className="size-6 p-1 text-xs">
              <TrashIcon className="size-3" />
            </Button>
          </DeleteDialog>
        </div>
      </div>
      <div>
        <h3 className="text-lg">{chapter.title}</h3>
        <div className="text-xs text-right text-muted-foreground">
          Ngày tạo: {formatDate(new Date(chapter.createdAt), "dd/MM/yyyy")}
          {" - "}
          Cập nhật: {formatDate(new Date(chapter.updatedAt), "dd/MM/yyyy")}
        </div>
      </div>
    </div>
  );
}
