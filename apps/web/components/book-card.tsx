import { BookFragment } from "@/apollo-client/__generated";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Cuboid, ImageIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface Props {
  book: BookFragment;
}

export const BookCard = ({ book }: Props) => {
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <Link href={`/books/${book.id}`}>
          <Avatar className="w-24 h-32 rounded-md hover:ring-2">
            <AvatarImage src={book.poster} />
            <AvatarFallback className="rounded-md">
              <ImageIcon className="w-24 h-32" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="flex-1 space-y-2 text-sm">
        <Link
          href={`/books/${book.id}`}
          className="line-clamp-1 hover:text-primary"
        >
          {book.name}
        </Link>
        <div className="text-muted-foreground line-clamp-2">
          {book.synopsis}
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={`/books/${book.id}`}
            className="flex items-center hover:text-primary"
          >
            <UserIcon className="mr-2 size-4" />
            {book.author?.name ?? book.createdBy.nickname}
          </Link>
          <span className="text-xs">
            {book.chapterCnt} chương -{" "}
            {new Date(book.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <div className="flex items-start justify-between gap-1">
          <Badge variant={"outline"} className="whitespace-nowrap px-1 py-0.5">
            <Cuboid className="mr-2 size-4" />
            {book.genre.name}
          </Badge>
          <div className="flex flex-wrap items-center justify-end gap-1">
            {book.tags.slice(0, 2).map((tag) => (
              <Badge
                className="px-1 py-0.5"
                key={tag.id}
                style={{
                  color: tag.group.color,
                  background: tag.group.bgColor,
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
