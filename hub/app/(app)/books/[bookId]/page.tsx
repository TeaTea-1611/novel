"use client";

import { useBookQuery } from "@/apollo-client/__generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileImage, FilePenLine, UserPen } from "lucide-react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Page() {
  const params = useParams<{ bookId: string }>();

  const { data, loading } = useBookQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
    skip: !params.bookId,
  });

  if (loading || !data?.book) {
    return (
      <div className="flex-1 p-1 border rounded-lg shadow-md bg-card">
        <div className="flex space-x-4">
          <Skeleton className="w-40 rounded-md h-60" />
          <div className="flex-1 py-1 space-y-4">
            <Skeleton className="w-3/4 h-8" />
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 p-4 border rounded-lg shadow-md bg-card">
      <div className="absolute top-4 right-4">
        <Link
          href={`/books/${data.book.id}/update`}
          className={buttonVariants({
            variant: "outline",
            className: "size-8",
          })}
        >
          <FilePenLine />
        </Link>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="rounded-md w-44 h-60">
            <AvatarImage
              src={data.book.poster}
              alt={"poster"}
              className="object-cover rounded-md"
            />
            <AvatarFallback className="rounded-md">
              <FileImage className="stroke-1 size-full" />
            </AvatarFallback>
          </Avatar>
          <Button className="w-44">Đổi ảnh bìa</Button>
        </div>
        <div className="flex flex-col items-center flex-1 space-y-4 text-sm text-muted-foreground lg:items-start">
          <h1 className="text-xl font-bold lg:text-left">{data.book.name}</h1>
          <div className="flex items-center">
            <UserPen className="mr-2 size-4" />
            {data.book.kind === 2
              ? data.book.createdBy.nickname
              : data.book.author?.name}
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                data.book.status === 1
                  ? "outline"
                  : data.book.status === 2
                    ? "success"
                    : "destructive"
              }
            >
              {["Còn tiếp", "Hoàn thành", "Tạm dừng"][data.book.status - 1]}
            </Badge>
            <Badge>{data.book.genre.name}</Badge>
            <Badge>{data.book.genre.name}</Badge>
            {data.book.tags.map((tag) => (
              <Badge
                style={{
                  color: tag.group.color,
                  background: tag.group.bgColor,
                }}
                key={tag.id}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center w-16">
              <span className="font-bold">{data.book.readCnt}</span>
              <span>Lượt đọc</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center w-16">
              <span className="font-bold">{data.book.chapterCnt}</span>
              <span>Chương</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center w-16">
              <span className="font-bold">{data.book.commentCnt}</span>
              <span>Bình luận</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center w-16">
              <span className="font-bold">{data.book.reviewCnt}</span>
              <span>Đánh giá</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center w-16">
              <span className="font-bold">{data.book.flowerCnt}</span>
              <span>Hoa</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/books/${params.bookId}/chapters`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              Danh sách chương
            </Link>
            <Link
              href={`/books/${params.bookId}/chapters/create`}
              className={buttonVariants({
                size: "sm",
              })}
            >
              Thêm chương mới
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="pb-2 mt-10 text-xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0">
          Giới thiệu
        </h3>
        <p
          className="text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: data.book.synopsis.replace(/\n/g, "<br />"),
          }}
        ></p>
      </div>
      {/* <div className="mt-6 space-y-3">
        <h3 className="pb-2 mt-10 text-xl font-semibold tracking-tight transition-colors border-b scroll-m-20 first:mt-0">
          Danh sách chương
        </h3>
        <div className="grid gap-1 lg:grid-cols-3">
          {[...Array(20)].map((_, i) => (
            <Link
              key={i}
              href={"#"}
              className={"border-b shadow p-2 hover:bg-accent rounded-md"}
            >
              <div className="text-sm text-primary line-clamp-2">
                Chương 43: Bùi kiếm tiên hồi ức lục ③ Diệu Nghiên chiếc nhẫn aaa
                aaa
              </div>
              <span className="text-xs text-muted-foreground">16h truoc</span>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
}
