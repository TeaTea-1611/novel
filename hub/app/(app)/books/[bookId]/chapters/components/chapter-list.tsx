"use client";

import { useSwapChaptersMutation } from "@/apollo-client/__generated";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
import {
  EditIcon,
  GripVerticalIcon,
  ListCheckIcon,
  ListIcon,
  ListRestartIcon,
  MoveDownIcon,
  MoveUpIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ChapterItem, ChapterSwapItem } from "./chapter-item";
import { ChaptersDeleteDialog } from "./chapters-delete-dialog";
import { type Chapter } from "./types";
import { ChaptersUpdateDialog } from "./chapters-update-dialog";

interface ChapterListProps {
  bookId: number;
  data: Chapter[];
}

export const ChapterList = ({ bookId, data }: ChapterListProps) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);

  const filteredAndSortedChapters = useMemo(() => {
    setSelectedChapters([]);
    return data
      .filter((chapter) =>
        chapter.title.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => (sort === "asc" ? a.order - b.order : b.order - a.order));
  }, [data, search, sort]);

  const displayedChapters = showAllChapters
    ? filteredAndSortedChapters
    : filteredAndSortedChapters.slice(0, 5);

  const handleSelectChapter = (chapterId: number) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId],
    );
  };

  const handleSelectAll = () => {
    setSelectedChapters(
      selectedChapters.length === filteredAndSortedChapters.length
        ? []
        : filteredAndSortedChapters.map((chapter) => chapter.id),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex-1 max-w-80">
          <Input
            label="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setSort((prev) => (prev === "asc" ? "desc" : "asc"))}
          >
            {sort === "asc" ? (
              <MoveUpIcon className="size-4" />
            ) : (
              <MoveDownIcon className="size-4" />
            )}
          </Button>
          <Link
            href={`/books/${bookId}/chapters/swap`}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <GripVerticalIcon className="size-4" />
          </Link>
          <Button variant={"gooeyRight"} className="h-8" asChild>
            <Link href={`/books/${bookId}/chapters/create/${data.length + 1}`}>
              <PlusIcon className="mr-2 size-4" />
              Thêm chương
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Button
            variant={
              selectedChapters.length === filteredAndSortedChapters.length &&
              filteredAndSortedChapters.length > 0
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={handleSelectAll}
          >
            <ListCheckIcon className="mr-2 size-4" />
            Chọn tất cả
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <ChaptersDeleteDialog bookId={bookId} chapterIds={selectedChapters}>
            <Button
              variant="destructive"
              size="sm"
              disabled={!selectedChapters.length}
            >
              <TrashIcon className="mr-2 size-4" />
              Xóa ({
                selectedChapters.length
              })
            </Button>
          </ChaptersDeleteDialog>
          <ChaptersUpdateDialog bookId={bookId} chapterIds={selectedChapters}>
            <Button
              variant="secondary"
              size="sm"
              disabled={!selectedChapters.length}
            >
              <EditIcon className="mr-2 size-4" />
              Cập nhật ({
                selectedChapters.length
              })
            </Button>
          </ChaptersUpdateDialog>
        </div>
      </div>
      <div className="sortable-list">
        {displayedChapters.map((chapter) => (
          <div key={chapter.id}>
            <ChapterItem
              chapter={chapter}
              selected={selectedChapters.includes(chapter.id)}
              onSelect={handleSelectChapter}
            />
            <div className={cn("flex items-center gap-3 py-1")}>
              <hr className="w-full" />
              <Button variant={"outline"} className="h-6 text-xs" asChild>
                <Link
                  href={`/books/${bookId}/chapters/create/${chapter.order + 1}`}
                >
                  <PlusIcon />
                  Thêm chương mới
                </Link>
              </Button>
              <hr className="w-full" />
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedChapters.length > 5 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllChapters(!showAllChapters)}
          >
            {showAllChapters
              ? "Ẩn bớt"
              : `Xem tất cả (${filteredAndSortedChapters.length} chương)`}
          </Button>
        </div>
      )}
    </div>
  );
};

interface ChapterSwapList {
  bookId: number;
  initialData: (Chapter & { newOrder: number })[];
}

export const ChapterSwapList = ({ bookId, initialData }: ChapterSwapList) => {
  const [chapters, setChapters] =
    useState<(Chapter & { newOrder: number })[]>(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  useMemo(() => {
    setChapters(
      initialData.sort((a, b) =>
        sort === "asc" ? a.order - b.order : b.order - a.order,
      ),
    );
  }, [initialData, sort]);

  const [swapChapters, { loading }] = useSwapChaptersMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.swapChapters) {
        toast.success("Đã lưu thứ tự chương thành công!");
        setHasChanges(false);
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

    const changesExist = updatedChapters.some(
      (chapter) => chapter.order !== chapter.newOrder,
    );
    setHasChanges(changesExist);
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
      <div className="flex items-center justify-between space-x-2">
        <Button variant={"outline"} asChild>
          <Link href={`/books/${bookId}/chapters`}>
            <ListIcon className="mr-2 size-4" />
            Danh sách chương ({
              initialData.length
            } Chương)
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setSort((prev) => (prev === "asc" ? "desc" : "asc"))}
          >
            {sort === "asc" ? (
              <MoveUpIcon className="size-4" />
            ) : (
              <MoveDownIcon className="size-4" />
            )}
          </Button>
          <Button
            variant={"outline"}
            className="size-9"
            disabled={!hasChanges}
            onClick={() => {
              setChapters(initialData);
              setHasChanges(false);
            }}
          >
            <ListRestartIcon className="size-4" />
          </Button>
          <Button asChild>
            <Link
              href={`/books/${bookId}/chapters/create/${initialData.length + 1}`}
            >
              <PlusIcon className="mr-2 size-4" />
              Thêm chương mới
            </Link>
          </Button>
        </div>
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
              <ChapterSwapItem key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        onClick={handleSave}
        disabled={!hasChanges}
        loading={loading}
        className="w-full"
      >
        Lưu thay đổi
      </Button>
    </div>
  );
};
