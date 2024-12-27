"use client";

import { ChapterFragment } from "@/apollo-client/__generated";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@workspace/ui/lib/utils";
import "@/public/registry/themes.css";
import { fonts } from "@/styles/fonts";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { ChaptersSheet } from "../chapters-sheet";
import { Separator } from "@workspace/ui/components/separator";
import { ConfigSheet } from "./config-sheet";

interface Props {
  chapter: ChapterFragment & {
    content: string;
    book?: {
      name: string;
    } | null;
  };
}

export default function Chapter({ chapter }: Props) {
  const config = useConfig();

  const currentFont = useMemo(
    () => fonts.find((font) => font.name === config.font)?.font.className,
    [config.font],
  );

  return (
    <div className="flex flex-col border bg-card rounded-xl">
      <Link
        href={`/books/${chapter.bookId}`}
        className="p-2 text-2xl text-center"
      >
        {chapter.book?.name}
      </Link>
      <h2 className="p-2 text-lg text-center">
        Chương {chapter.order}: {chapter.title}
      </h2>
      <div className="flex items-center justify-center gap-2 p-2">
        <ConfigSheet>
          <Button variant="outline" size="sm">
            <SettingsIcon className="mr-2 size-4" />
            Cấu hình
          </Button>
        </ConfigSheet>
        <Button variant="outline" size="sm">
          <BookmarkIcon className="mr-2 size-4" />
          Đánh dấu
        </Button>
      </div>
      <div className="flex items-center justify-between p-2">
        <Link
          href={`/books/${chapter.bookId}/${chapter.order - 1 || 1}`}
          className={buttonVariants({ variant: "linkHover2" })}
        >
          <ChevronLeftIcon className="mr-2 size-4" />
          Chương trước
        </Link>
        <ChaptersSheet
          bookId={chapter.bookId}
          bookName={chapter.book?.name ?? ""}
        >
          <Button variant="outline" size="sm">
            <ListIcon className="mr-2 size-4" />
            Danh sách chương
          </Button>
        </ChaptersSheet>
        <Link
          href={`/books/${chapter.bookId}/${chapter.order + 1}`}
          className={buttonVariants({ variant: "linkHover2" })}
        >
          Chương sau
          <ChevronRightIcon className="ml-2 size-4" />
        </Link>
      </div>
      <Separator />
      <div
        className={cn(
          `theme-${config.theme} ${currentFont} bg-background text-foreground p-2 sm:p-4 font-medium`,
        )}
        style={{
          fontSize: config.fontSize,
          textAlign: config.textAlign,
          lineHeight: config.lineHeight,
        }}
        dangerouslySetInnerHTML={{
          __html: chapter.content
            .replace(/\./g, ".<br/>")
            .replace(/\n/g, "<br />"),
        }}
      ></div>
      <Separator />
      <div className="flex items-center justify-between p-2">
        <Link href={"/"} className={buttonVariants({ variant: "linkHover2" })}>
          <ChevronLeftIcon className="mr-2 size-4" />
          Chương trước
        </Link>
        <ChaptersSheet
          bookId={chapter.bookId}
          bookName={chapter.book?.name ?? ""}
        >
          <Button variant="outline" size="sm">
            <ListIcon className="mr-2 size-4" />
            Danh sách chương
          </Button>
        </ChaptersSheet>
        <Link href={"/"} className={buttonVariants({ variant: "linkHover2" })}>
          Chương sau
          <ChevronRightIcon className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
