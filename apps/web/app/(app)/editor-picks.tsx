"use client";

import { BookFragment } from "@/apollo-client/__generated";
import { UserAvatar } from "@/components/user-avatar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/components/icons";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@workspace/ui/components/morphing-dialog";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { TextShimmer } from "@workspace/ui/components/text-shimmer";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  BookmarkIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  ImageIcon,
  LayersIcon,
  ListIcon,
  MessageSquareTextIcon,
  SparkleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BookCardProps {
  book: BookFragment;
}

export const BookCard = ({ book }: BookCardProps) => {
  const [isDialogExpanded, setIsDialogExpanded] = useState(false);
  const maxDialogLength = 500;

  const truncatedSynopsis =
    book.synopsis.length > maxDialogLength && !isDialogExpanded
      ? book.synopsis.slice(0, maxDialogLength) + "..."
      : book.synopsis;

  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <MorphingDialogTrigger>
        <article className="flex flex-col justify-between gap-2 p-2 transition-colors border shadow cursor-pointer h-96 rounded-xl bg-card hover:border-primary">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserAvatar avatar={book.createdBy.avatar} className="size-6" />
                <span className="text-sm font-medium">
                  {book.createdBy.nickname}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon className="size-4" />
              </Button>
            </div>
            <h3 className="h-12 text-lg font-semibold leading-6 transition-colors line-clamp-2 hover:text-primary">
              {book.name}
            </h3>
            <div className="flex flex-wrap items-start gap-1 -mx-1">
              <Badge variant="outline" className="text-muted-foreground">
                <LayersIcon className="mr-2 size-4" />
                {book.genre.name}
              </Badge>
              {book.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="px-1 py-0.5"
                  style={{
                    color: tag.group.color,
                    borderColor: tag.group.color,
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center transition-colors hover:text-primary text-muted-foreground">
                <UserIcon className="mr-2 size-4" />
                {book.author?.name ?? book.createdBy.nickname}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs">
                Chương mới:{" "}
                {formatDistanceToNow(new Date(book.newChapterAt), {
                  locale: vi,
                  addSuffix: true,
                })}
              </span>
              <span className="text-xs">
                Ngày đăng:{" "}
                {formatDistanceToNow(new Date(book.createdAt), {
                  locale: vi,
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-1 gap-2">
            <Avatar className="w-24 h-32 rounded-md">
              <AvatarImage src={book.poster} alt={book.name} />
              <AvatarFallback className="rounded-md">
                <ImageIcon className="w-24 h-32" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground line-clamp-6">
                {book.synopsis}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden rounded-lg bg-primary/10">
              <Button
                variant="ghost"
                className="flex items-center h-8 gap-1 px-2 py-0.5 hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Icons.upvote className="size-6" />
                <span className="text-sm">0</span>
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button
                variant="ghost"
                className="flex items-center h-8 gap-1 px-2 py-0.5 hover:bg-destructive hover:text-destructive-foreground"
              >
                <Icons.upvote className="-rotate-180 size-6" />
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center px-2 py-0.5">
                <SparkleIcon className="mr-2 size-5" />
                <span className="text-sm text-muted-foreground">
                  {book.points.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="flex items-center h-8 gap-1 px-2 py-0.5 hover:bg-primary hover:text-primary-foreground rounded-lg"
              >
                <ListIcon className="size-5" />
                <span className="text-sm">{book.chapterCnt}</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center h-8 gap-1 px-2 py-0.5 hover:bg-primary hover:text-primary-foreground rounded-lg"
              >
                <StarIcon className="size-5" />
                <span className="text-sm">{book.reviewCnt}</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center h-8 gap-1 px-2 py-0.5 hover:bg-primary hover:text-primary-foreground rounded-lg"
              >
                <MessageSquareTextIcon className="size-5" />
                <span className="text-sm">0</span>
              </Button>
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center rounded-lg size-8 hover:bg-primary hover:text-primary-foreground"
              >
                <BookmarkIcon className="size-5" />
              </Button>
            </div>
          </div>
        </article>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogClose />
        <MorphingDialogContent className="max-w-screen-lg max-h-screen overflow-y-auto">
          <MorphingDialogTitle className="text-2xl line-clamp-2">
            {book.name}
          </MorphingDialogTitle>
          <MorphingDialogSubtitle className="flex flex-col gap-2">
            <div className="flex items-center text-muted-foreground">
              <UserIcon className="mr-2 size-4" />
              {book.author?.name ?? book.createdBy.nickname}
            </div>
            <div className="flex flex-wrap gap-2 -mx-1">
              <Badge variant="outline" className="text-muted-foreground">
                <LayersIcon className="mr-2 size-4" />
                {book.genre.name}
              </Badge>
              {book.tags.map((tag) => (
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
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Chương mới:{" "}
                {formatDistanceToNow(new Date(book.newChapterAt), {
                  locale: vi,
                  addSuffix: true,
                })}
              </span>
              <span className="text-sm text-muted-foreground">
                Ngày đăng:{" "}
                {formatDistanceToNow(new Date(book.createdAt), {
                  locale: vi,
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm">
                <BookOpenIcon className="mr-2 size-4" />
                Đọc truyện
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkIcon className="mr-2 size-4" />
                Đánh dấu
              </Button>
              <Button variant="outline" size="sm">
                <StarIcon className="mr-2 size-4" />
                Đánh giá ({book.reviewCnt})
              </Button>
            </div>
          </MorphingDialogSubtitle>
          <Separator className="my-2" />
          <MorphingDialogDescription
            disableLayoutAnimation
            variants={{
              initial: { opacity: 0, scale: 0.8, y: 100 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.8, y: 100 },
            }}
          >
            <span className="mt-4 font-semibold">Tóm tắt</span>
            <p
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: truncatedSynopsis.replace(/\n/g, "<br />"),
              }}
            />
            {book.synopsis.length > maxDialogLength && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-primary hover:text-primary/80"
                onClick={() => setIsDialogExpanded(!isDialogExpanded)}
              >
                {isDialogExpanded ? (
                  <>
                    Thu gọn <ChevronUpIcon className="ml-1 size-4" />
                  </>
                ) : (
                  <>
                    Xem thêm <ChevronDownIcon className="ml-1 size-4" />
                  </>
                )}
              </Button>
            )}
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

interface Props {
  data?: BookFragment[];
  loading: boolean;
}

export function EditorPicks({ data, loading }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <TextShimmer className="text-xl font-semibold tracking-tight" as={"h2"}>
          BTV Đề cử
        </TextShimmer>
        <Button variant="linkHover2" asChild>
          <Link href={"/books"}>Xem thêm</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-2 p-2 transition-colors border shadow cursor-pointer h-96 rounded-xl bg-card hover:border-primary"
              >
                <Skeleton className="w-48 h-8" />
                <Skeleton className="flex-1 w-full" />
                <Skeleton className="w-full h-8" />
              </div>
            ))
          : data?.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
