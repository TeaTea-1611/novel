"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDate } from "date-fns";
import {
  AlignLeftIcon,
  CalendarIcon,
  FilePenLineIcon,
  GripVerticalIcon,
  LockIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { type Chapter } from "./types";
import { ChaptersDeleteDialog } from "./chapters-delete-dialog";

interface Props {
  chapter: Chapter;
  selected: boolean;
  onSelect: (chapterId: number) => void;
}

export function ChapterItem({ chapter, selected, onSelect }: Props) {
  const handleSelectChapter = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the main div or its direct children
    const target = e.target as HTMLElement;
    const isInteractiveElement =
      target.closest("a") ||
      target.closest("button") ||
      target.closest('[data-interactive="true"]');

    // Only select if not an interactive element
    if (!isInteractiveElement) {
      onSelect(chapter.id);
    }
  };

  return (
    <div
      className={cn(
        "p-2 space-y-2 w-full border-2 rounded-md shadow bg-background border-input sortable-item",
        { "border-primary": selected },
      )}
      onClick={handleSelectChapter}
    >
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
          <ChaptersDeleteDialog
            bookId={chapter.bookId}
            chapterIds={[chapter.id]}
          >
            <Button variant={"destructive"} className="p-1 text-xs size-6">
              <TrashIcon className="size-3" />
            </Button>
          </ChaptersDeleteDialog>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg text-left">{chapter.title}</h3>
        <div className="text-xs text-right text-muted-foreground">
          Ngày tạo: {formatDate(new Date(chapter.createdAt), "dd/MM/yyyy")}
          {" - "}
          Cập nhật: {formatDate(new Date(chapter.updatedAt), "dd/MM/yyyy")}
        </div>
      </div>
    </div>
  );
}

export function ChapterSwapItem({
  chapter,
}: {
  chapter: Chapter & { newOrder: number };
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isReordered = chapter.newOrder !== chapter.order;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "w-full p-2 space-y-2 rounded-md shadow bg-background border-2 border-input",
        { "border-primary": isReordered },
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button className="p-0 size-6" {...attributes} {...listeners}>
            <GripVerticalIcon className="size-4" />
          </Button>
          <div
            className={cn(
              "flex items-center h-6 p-1 text-xs border rounded-md",
              { "bg-destructive text-destructive-foreground": isReordered },
            )}
          >
            <AlignLeftIcon className="mr-2 size-3" />
            Chương {chapter.order}
          </div>
          {isReordered && (
            <div className="flex items-center h-6 p-1 text-xs border rounded-md bg-primary text-primary-foreground">
              <AlignLeftIcon className="mr-2 size-3" />
              Chương mới {chapter.newOrder}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <LockIcon className="mr-2 size-3" />
            {chapter.unlockPrice}
          </div>
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <CalendarIcon className="mr-2 size-3" />
            {formatDate(new Date(chapter.publishAt), "dd/MM/yyyy")}
          </div>
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
          <ChaptersDeleteDialog
            bookId={chapter.bookId}
            chapterIds={[chapter.id]}
          >
            <Button variant={"destructive"} className="p-1 text-xs size-6">
              <TrashIcon className="size-3" />
            </Button>
          </ChaptersDeleteDialog>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg text-left">{chapter.title}</h3>
        <div className="text-xs text-right text-muted-foreground">
          Ngày tạo: {formatDate(new Date(chapter.createdAt), "dd/MM/yyyy")}
          {" - "}
          Cập nhật: {formatDate(new Date(chapter.updatedAt), "dd/MM/yyyy")}
        </div>
      </div>
    </div>
  );
}
