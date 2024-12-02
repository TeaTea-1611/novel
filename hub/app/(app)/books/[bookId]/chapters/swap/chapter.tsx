import { useSortable } from "@dnd-kit/sortable";
import { Chapter } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { AlignLeftIcon, CalendarIcon, LockIcon } from "lucide-react";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";

export const ChapterItem = ({
  chapter,
}: {
  chapter: Chapter & { newOrder: number };
}) => {
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
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{chapter.title}</h3>
        <div className="text-xs text-right text-muted-foreground">
          Ngày tạo: {formatDate(new Date(chapter.createdAt), "dd/MM/yyyy")}
          {" - "}
          Cập nhật: {formatDate(new Date(chapter.updatedAt), "dd/MM/yyyy")}
        </div>
      </div>
    </div>
  );
};
