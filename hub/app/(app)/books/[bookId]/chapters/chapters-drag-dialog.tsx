"use client";
import { useSwapChaptersMutation } from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlignLeftIcon, RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Chapter as BaseChapter } from "./types";

export interface Chapter extends BaseChapter {
  newOrder: number;
}

interface Props {
  bookId: number;
  chapters: Chapter[];
  children: React.ReactNode;
  sort: "asc" | "desc";
}

export const ChaptersDragDialog: React.FC<Props> = ({
  bookId,
  chapters,
  sort,
  children,
}) => {
  const [dragChapters, setDragChapters] = useState<Chapter[]>(chapters);
  const [hasChanges, setHasChanges] = useState(false);

  const [swapChapters, { loading }] = useSwapChaptersMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.swapChapters) {
        toast.success("Đã lưu thứ tự chương thành công!");
        // setDragChapters(chapters);
      }
    },
  });
  const [open, setOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = dragChapters.findIndex(
      (chapter) => chapter.id === active.id,
    );
    const newIndex = dragChapters.findIndex(
      (chapter) => chapter.id === over.id,
    );

    const updatedChapters = arrayMove(dragChapters, oldIndex, newIndex).map(
      (chapter, index) => {
        const newOrder =
          sort === "asc" ? index + 1 : dragChapters.length - index;

        return {
          ...chapter,
          newOrder: newOrder,
        };
      },
    );

    setDragChapters(updatedChapters);

    const changesExist = updatedChapters.some(
      (chapter) => chapter.order !== chapter.newOrder,
    );
    setHasChanges(changesExist);
  };

  useEffect(() => {}, [dragChapters]);

  const handleSave = async () => {
    const chaptersToUpdate = dragChapters.filter(
      (chapter) => chapter.order !== chapter.newOrder,
    );

    swapChapters({
      variables: {
        bookId,
        data: chaptersToUpdate.map((chapter) => ({
          id: chapter.id,
          newOrder: chapter.newOrder!,
        })),
      },
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          setDragChapters(chapters);
        } else {
          setHasChanges(false);
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-md size-full">
        <DialogHeader>
          <DialogTitle>Sắp xếp chương</DialogTitle>
          <DialogDescription>
            Kéo và thả để thay đổi thứ tự các chương. Các chương được đánh dấu
            màu xanh là các chương có thứ tự mới.
            <br />
            Khi ấn Lưu thay đổi bạn sẽ không thể hoàn tác
          </DialogDescription>
        </DialogHeader>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={dragChapters.map((chapter) => chapter.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 overflow-y-auto">
              {dragChapters.map((chapter) => (
                <ChapterItem key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={() => setDragChapters(chapters)}>
              <RefreshCwIcon className="mr-2 size-4" />
              Đặt lại
            </Button>
            <div className="space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  setHasChanges(false);
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading || !hasChanges}
                loading={loading}
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ChapterItem: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isReordered = chapter.newOrder && chapter.newOrder !== chapter.order;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        w-full p-2 space-y-2 border rounded-md shadow 
        bg-background border-input 
        ${isReordered ? "border bg-primary/10" : ""}
      `}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
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
      </div>
      <div>
        <h3 className="text-lg">{chapter.title}</h3>
      </div>
    </div>
  );
};
