import { BookFragment } from "@/apollo-client/__generated";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import {
  BookOpenIcon,
  FileImageIcon,
  FlagIcon,
  ListIcon,
  MessageCircleMoreIcon,
  StarIcon,
  UserPen,
} from "lucide-react";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import NumberTicker from "@workspace/ui/components/number-ticker";
import { Separator } from "@workspace/ui/components/separator";
import Link from "next/link";
import { BookSynopsis } from "./book-synopsis";
import { ChaptersSheet } from "./chapters-sheet";
import { CommentsSheet } from "./comments-sheet";

interface Props {
  book: BookFragment & {
    reading?: {
      currentChapter: number;
      readingAt: number;
    } | null;
  };
}

export const Book = ({ book }: Props) => (
  <div className="p-2 space-y-4 border shadow rounded-xl bg-card">
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex flex-col items-center space-y-2">
        <Avatar className="rounded-md w-44 h-60">
          <AvatarImage
            src={book.poster}
            alt={book.name}
            className="object-cover rounded-md"
          />
          <AvatarFallback className="rounded-md">
            <FileImageIcon className="stroke-1 size-full" />
          </AvatarFallback>
        </Avatar>
        <Button variant={"linkHover2"}>
          <FlagIcon className="mr-2 size-4" />
          Báo cáo
        </Button>
      </div>
      <div className="flex flex-col items-center flex-1 space-y-4 text-sm text-muted-foreground lg:items-start">
        <h1 className="text-2xl font-bold tracking-tight transition-colors line-clamp-1">
          {book.name}
        </h1>
        <div className="flex items-center">
          <UserPen className="mr-2 size-4" />
          {book.author?.name ?? book.createdBy.nickname}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/books/${book.id}/${book.reading?.currentChapter ?? 1}`}
            className={buttonVariants({
              size: "sm",
            })}
          >
            <BookOpenIcon className="mr-2 size-4" />
            {book.reading?.currentChapter ? "Đọc tiếp" : "Đọc truyện"}
          </Link>
          <ChaptersSheet bookId={book.id} bookName={book.name}>
            <Button variant="outline" size="sm">
              <ListIcon className="mr-2 size-4" />
              Danh sách chương
            </Button>
          </ChaptersSheet>
          <Button variant="outline" size="sm">
            <StarIcon className="mr-2 size-4" />
            Đánh giá
          </Button>
          <CommentsSheet bookId={book.id} bookName={book.name}>
            <Button variant="outline" size="sm">
              <MessageCircleMoreIcon className="mr-2 size-4" />
              Thảo luận
            </Button>
          </CommentsSheet>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center min-w-16">
            <NumberTicker value={book.points} className="text-lg" />
            <span className="text-muted-foreground">Điểm</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center min-w-16">
            <NumberTicker className="text-lg" value={book.readCnt} />
            <span className="text-muted-foreground">Lượt đọc</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center min-w-16">
            <NumberTicker className="text-lg" value={book.chapterCnt} />
            <span className="text-muted-foreground">Chương</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center min-w-16">
            <NumberTicker className="text-lg" value={book.commentCnt} />
            <span className="text-muted-foreground">Bình luận</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center min-w-16">
            <NumberTicker className="text-lg" value={book.reviewCnt} />
            <span className="text-muted-foreground">Đánh giá</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center min-w-16">
            <NumberTicker className="text-lg" value={book.flowerCnt} />
            <span className="text-muted-foreground">Hoa</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              book.status === 1
                ? "outline"
                : book.status === 2
                  ? "success"
                  : "destructive"
            }
          >
            {["Còn tiếp", "Hoàn thành", "Tạm dừng"][book.status - 1]}
          </Badge>
          <Badge>{book.genre.name}</Badge>
          {book.tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={"outline"}
              style={{
                color: tag.group.bgColor,
                borderColor: tag.group.bgColor,
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
    <BookSynopsis synopsis={book.synopsis} />
  </div>
);
