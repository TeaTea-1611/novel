"use client";

import { useChaptersQuery } from "@/apollo-client/generated";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
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
import { formatDate } from "date-fns";
import {
  AlignLeft,
  Calendar,
  FilePenLine,
  GripVerticalIcon,
  Lock,
  Plus,
} from "lucide-react"; // Assuming you're using Lucide icons
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useMemo, useState } from "react";

type Chapter = {
  __typename?: "Chapter";
  id: number;
  bookId: number;
  title: string;
  order: number;
  unlockPrice: number;
  publishAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

function SortableChapter({ chapter }: { chapter: Chapter }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 space-y-2 border rounded-md shadow bg-background border-input sortable-item"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={"outline"}
            className="p-1 size-6 cursor-grab"
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon className="stroke-1 size-3" />
          </Button>
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <AlignLeft className="mr-2 size-3" />
            Chương {chapter.order}
          </div>
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <Lock className="mr-2 size-3" />
            {chapter.unlockPrice}
          </div>
          <div className="flex items-center h-6 p-1 text-xs border rounded-md">
            <Calendar className="mr-2 size-3" />
            {formatDate(new Date(chapter.publishAt), "dd/MM/yyyy")}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/books/${chapter.bookId}/chapters/${chapter.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "h-6 p-1 text-xs",
            )}
          >
            <FilePenLine className="mr-2 size-3" />
            Chỉnh sửa
          </Link>
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

export default function Page() {
  const params = useParams<{ bookId: string }>();
  const { data, loading } = useChaptersQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
    skip: !params.bookId,
  });

  const [chapters, setChapters] = useState<Chapter[] | null>(null);

  useMemo(() => {
    if (data?.chapters) {
      setChapters([...data.chapters].sort((a, b) => a.order - b.order));
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over || active.id === over.id || !chapters) return;

    const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
    const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);

    const updatedChapters = arrayMove(chapters, oldIndex, newIndex);

    setChapters(updatedChapters);

    // TODO: Sync with server
    console.log("Updated Chapter Order:", updatedChapters);
  }

  if (loading) return <div>Loading...</div>;

  if (!chapters) return <div>No chapters found</div>;

  return (
    <div className="p-4 mx-auto rounded-md shadow-md bg-card">
      <Link
        href={`/books/${params.bookId}/chapters/create/1`}
        className="button"
      >
        Thêm chương mới
      </Link>
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
          <div className="sortable-list">
            {chapters.map((chapter) => (
              <Fragment key={chapter.id}>
                <SortableChapter chapter={chapter} />
                <div className="flex items-center gap-3 py-1">
                  <hr className="w-full" />
                  <Button variant={"outline"} className="h-6 text-xs">
                    <Plus />
                    Thêm chương mới
                  </Button>
                  <hr className="w-full" />
                </div>
              </Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
