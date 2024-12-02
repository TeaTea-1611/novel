"use client";

import { useSwapChaptersMutation } from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "sonner";
import { type Chapter as ChapterType } from "../types";
import { ChapterItem } from "./chapter";

type Chapter = ChapterType & { newOrder: number };

interface Props {
  bookId: number;
  initialData: Chapter[];
}

export const Chapters = ({ bookId, initialData }: Props) => {
  const [chapters, setChapters] = useState<Chapter[]>(initialData);

  const [swapChapters, { loading }] = useSwapChaptersMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.swapChapters) {
        toast.success("Đã lưu thứ tự chương thành công!");
        setChapters(initialData.sort((a, b) => a.order - b.order));
      }
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
    const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);

    const updatedChapters = arrayMove(chapters, oldIndex, newIndex).map(
      (chapter, index) => {
        return {
          ...chapter,
          newOrder: index + 1,
        };
      },
    );

    setChapters(updatedChapters);
  };

  const handleSave = async () => {
    const chaptersToUpdate = chapters.filter(
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
    <div className="space-y-4">
      <div className="flex justify-between w-full">
        <p className="mx-2 text-sm text-muted-foreground">
          Kéo và thả để thay đổi thứ tự các chương. Các chương được đánh dấu màu
          xanh là các chương có thứ tự mới.
          <br />
          Khi ấn Lưu thay đổi bạn sẽ không thể hoàn tác
        </p>
        <Button onClick={handleSave} loading={loading}>
          Lưu thay đổi
        </Button>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={chapters.map((chapter) => chapter.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 overflow-y-auto">
            {chapters.map((chapter) => (
              <ChapterItem key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
