"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  GripVerticalIcon,
  MoveDownIcon,
  MoveUpIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Chapter } from "./chapter";
import { ChaptersDragDialog } from "./chapters-drag-dialog";

export type Chapter = {
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

interface Props {
  data: Chapter[];
}

export const Chapters = ({ data }: Props) => {
  const params = useParams<{ bookId: string }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const filteredAndSortedChapters = useMemo(() => {
    return data
      .filter((chapter) =>
        chapter.title.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => (sort === "asc" ? a.order - b.order : b.order - a.order));
  }, [data, search, sort]);

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
          <ChaptersDragDialog
            bookId={parseInt(params.bookId)}
            chapters={filteredAndSortedChapters.map((chapter) => ({
              ...chapter,
              newOrder: chapter.order,
            }))}
            sort={sort}
          >
            <Button variant={"outline"} size={"icon"}>
              <GripVerticalIcon className="size-4" />
            </Button>
          </ChaptersDragDialog>
        </div>
      </div>
      <div className="sortable-list">
        {filteredAndSortedChapters.map((chapter, i) => (
          <div key={chapter.id}>
            <Chapter chapter={chapter} />
            <div
              className={cn("flex items-center gap-3 py-1 duration-300", {
                "opacity-0 hover:opacity-100": i < data.length - 1,
              })}
            >
              <hr className="w-full" />
              <Button variant={"outline"} className="h-6 text-xs" asChild>
                <Link
                  href={`/books/${params.bookId}/chapters/create/${chapter.order + 1}`}
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
    </div>
  );
};
