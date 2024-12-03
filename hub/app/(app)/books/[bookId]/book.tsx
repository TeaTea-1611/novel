import { BookFragment } from "@/apollo-client/__generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileImageIcon, ListIcon, PlusIcon, UserPen } from "lucide-react";
import { EditPosterDialog } from "./edit-poster-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { BookSynopsis } from "./book-synopsis";
import { BookNameInput } from "./book-name-input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Props {
  book: BookFragment;
}

export const Book = ({ book }: Props) => (
  <div className="space-y-6">
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
        <EditPosterDialog bookId={book.id}>
          <Button className="w-44">Đổi ảnh bìa</Button>
        </EditPosterDialog>
      </div>
      <div className="flex flex-col items-center flex-1 space-y-4 text-sm text-muted-foreground lg:items-start">
        <BookNameInput bookId={book.id} name={book.name} />
        <div className="flex items-center">
          <UserPen className="mr-2 size-4" />
          {book.author?.name ?? book.createdBy.nickname}
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
              style={{
                color: tag.group.color,
                background: tag.group.bgColor,
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center w-16">
            <span className="font-bold">{book.readCnt}</span>
            <span>Lượt đọc</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center w-16">
            <span className="font-bold">{book.chapterCnt}</span>
            <span>Chương</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center w-16">
            <span className="font-bold">{book.commentCnt}</span>
            <span>Bình luận</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center w-16">
            <span className="font-bold">{book.reviewCnt}</span>
            <span>Đánh giá</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center w-16">
            <span className="font-bold">{book.flowerCnt}</span>
            <span>Hoa</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/books/${book.id}/chapters`}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            <ListIcon className="mr-2 size-4" />
            Danh sách chương
          </Link>
          <Link
            href={`/books/${book.id}/chapters/create/${book.chapterCnt + 1}`}
            className={buttonVariants({ size: "sm" })}
          >
            <PlusIcon className="mr-2 size-4" />
            Thêm chương mới
          </Link>
        </div>
      </div>
    </div>
    <BookSynopsis bookId={book.id} synopsis={book.synopsis} />
  </div>
);
