"use client";

import { useBookSuspenseQuery } from "@/apollo-client/__generated";
import { BooksUpdateDrawer } from "@/features/novels/components/books-update-drawer";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  EllipsisIcon,
  FilePenLineIcon,
  FilePlus2Icon,
  LayersIcon,
  ListIcon,
  MessageSquareTextIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import * as React from "react";

export const Book = () => {
  const params = useParams<{ bookId: string }>();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = useBookSuspenseQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
  });

  const book = data?.book;

  const [imageSrc, setImageSrc] = React.useState(
    book?.poster || "/default-image.png",
  );
  const [openUpdate, setOpenUpdate] = React.useState(false);

  if (!book) {
    return null;
  }

  const processedSynopsis = book.synopsis.replace(/\. /g, ".<br/> ");
  const synopsisLines = processedSynopsis.split("<br/>");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex w-44 flex-col gap-2">
          <Image
            src={imageSrc}
            alt={book.name}
            height={240}
            width={176}
            className="bg-accent h-60 w-44 rounded-lg"
            onError={() => {
              setImageSrc("/default-image.png");
            }}
          />
          <Button variant={"outline"} size={"sm"}>
            Thay ảnh
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <h1 className="text-center text-xl font-bold sm:line-clamp-1 sm:text-start">
            {book.name}
          </h1>
          <div className="mx-auto flex flex-wrap items-start gap-1 sm:-mx-1">
            <Badge variant="outline">
              <UserIcon className="mr-2 size-4" />
              {book.author?.name ?? book.createdBy.nickname}
            </Badge>
          </div>
          <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
            <Badge variant="outline">
              <LayersIcon className="mr-2 size-4" />
              {book.genre.name}
            </Badge>
            {book.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                style={{
                  color: tag.group.color,
                  borderColor: tag.group.color,
                }}
              >
                {tag.name}
              </Badge>
            ))}
            {book.tags.length > 2 && (
              <Badge>
                <EllipsisIcon className="size-4" />
              </Badge>
            )}
          </div>
          <div className="mx-auto flex items-center gap-2 sm:-mx-1">
            <Button variant="outline" size={"sm"}>
              <ListIcon className="mr-1" />
              Chương ({book.chapterCnt})
            </Button>
            <Button variant="outline" size={"sm"}>
              <StarIcon className="mr-1" />
              Đánh giá ({book.points})
            </Button>
            <Button variant="outline" size={"sm"}>
              <MessageSquareTextIcon className="mr-1" />
              Thảo luận ({book.commentCnt})
            </Button>
          </div>
          <div className="mx-auto flex items-center gap-2 sm:-mx-1">
            <div className="text-muted-foreground bg-muted flex min-w-20 flex-col items-center rounded-lg p-1 text-sm">
              <span>{book.readCnt.toLocaleString()}</span>
              <span>Lượt đọc</span>
            </div>
            <div className="text-muted-foreground bg-muted flex min-w-20 flex-col items-center rounded-lg p-1 text-sm">
              <span>{book.flowerCnt.toLocaleString()}</span>
              <span>Tặng hoa</span>
            </div>
            <div className="text-muted-foreground bg-muted flex min-w-20 flex-col items-center rounded-lg p-1 text-sm">
              <span>{book.wordCnt.toLocaleString()}</span>
              <span>Từ</span>
            </div>
          </div>
          <div className="mx-auto flex items-center gap-2 sm:-mx-1">
            <Button size={"sm"} onClick={() => setOpenUpdate(true)}>
              <FilePenLineIcon className="mr-1" />
              Chỉnh sửa
            </Button>
            <Button size={"sm"} onClick={() => setOpenUpdate(true)}>
              <FilePlus2Icon className="mr-1" />
              Thêm chương mới
            </Button>
            <BooksUpdateDrawer
              open={openUpdate}
              onOpenChange={setOpenUpdate}
              currentRow={book}
            />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="border-b text-lg">Tóm tắt</h2>
        <p
          className="text-muted-foreground text-sm"
          dangerouslySetInnerHTML={{
            __html: expanded
              ? processedSynopsis
              : synopsisLines.slice(0, 5).join("<br/>") +
                (synopsisLines.length > 5 ? "<br/>..." : ""),
          }}
        ></p>
        {synopsisLines.length > 5 && (
          <Button
            onClick={() => setExpanded(!expanded)}
            variant={"linkHover2"}
            className="p-0"
          >
            {expanded ? "Thu gọn" : "Xem thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
