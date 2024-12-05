"use client";

import { useOverviewPageQuery } from "@/apollo-client/__generated";
import BookAnalyticsDialog from "@/components/book-analytics-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "date-fns";
import { FileImageIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, loading } = useOverviewPageQuery();

  return (
    <>
      <h1 className="text-xl">Trang tổng quan của bạn</h1>
      <div className="grid gap-3 mt-2 lg:grid-cols-3">
        <div className="flex flex-col items-center w-full p-6 space-y-2 border shadow lg:col-span-2 rounded-xl bg-card text-card-foreground">
          <p className="text-sm text-center">
            Bạn có muốn xem các chỉ số của truyện bạn đăng gần đây?
          </p>
          {loading ? (
            <>
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
            </>
          ) : !data?.createdBooks.total ? (
            <div className="flex flex-col items-center justify-center gap-2 size-full">
              <p className="text-sm text-muted-foreground">
                Hãy đăng tải truyện để bắt đầu
              </p>
              <Link
                href={"/books/create"}
                className={buttonVariants({ variant: "gooeyRight" })}
              >
                Đăng truyện
              </Link>
            </div>
          ) : (
            <>
              {data.createdBooks.books.map((book) => (
                <BookAnalyticsDialog key={book.id} bookId={book.id}>
                  <button className="flex w-full p-1 space-x-2 border rounded-md hover:ring-1 hover:ring-primary bg-background">
                    <Avatar className="w-20 rounded-md h-28">
                      <AvatarImage
                        src={book.poster}
                        alt={book.name}
                        className="object-cover rounded-md"
                      />
                      <AvatarFallback className="rounded-md">
                        <FileImageIcon className="stroke-1 size-full" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-2">
                      <h3 className="line-clamp-1">{book.name}</h3>
                      <p className="text-sm line-clamp-2 text-muted-foreground">
                        {book.synopsis}
                      </p>
                      <div className="flex items-center">
                        <UserIcon className="mr-2 size-4" />
                        {book.author?.name ?? book.createdBy.nickname}
                      </div>

                      <span className="ml-auto text-xs text-muted-foreground">
                        Mới thêm chương:{" "}
                        {formatDate(new Date(book.newChapterAt), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </button>
                </BookAnalyticsDialog>
              ))}
              <Link
                href={"/books"}
                className={buttonVariants({ variant: "linkHover1" })}
              >
                Truyện đã đăng
              </Link>
            </>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="p-6 space-y-2 border shadow rounded-xl bg-card text-card-foreground">
            <h2 className="text-xl">Số liệu phân tích</h2>
            <div className="text-lg">Số truyện bạn đã đăng</div>
            <div className="text-2xl">
              {data?.createdBooks.total ? (
                <NumberTicker value={data.createdBooks.total} />
              ) : (
                0
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Điểm trung bình</span>
              {data?.myBookSummary.avgPoints ? (
                <NumberTicker
                  value={data.myBookSummary.avgPoints}
                  stiffness={500}
                />
              ) : (
                <span className="inline-block tracking-wider tabular-nums">
                  0
                </span>
              )}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm">Số lượt đọc</span>
              {data?.myBookSummary.readCnt ? (
                <NumberTicker
                  value={data.myBookSummary.readCnt}
                  stiffness={500}
                />
              ) : (
                <span className="inline-block tracking-wider tabular-nums">
                  0
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Số lượt bình luận</span>
              {data?.myBookSummary.commentCnt ? (
                <NumberTicker
                  value={data.myBookSummary.commentCnt}
                  stiffness={500}
                />
              ) : (
                <span className="inline-block tracking-wider tabular-nums">
                  0
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Số lượt đánh giá</span>
              {data?.myBookSummary.reviewCnt ? (
                <NumberTicker
                  value={data.myBookSummary.reviewCnt}
                  stiffness={500}
                />
              ) : (
                <span className="inline-block tracking-wider tabular-nums">
                  0
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Chương đã đăng</span>
              {data?.myBookSummary.chapterCnt ? (
                <NumberTicker
                  value={data.myBookSummary.chapterCnt}
                  stiffness={500}
                />
              ) : (
                <span className="inline-block tracking-wider tabular-nums">
                  0
                </span>
              )}
            </div>
            <Separator />
            <Link
              href={"/analytics"}
              className={buttonVariants({ variant: "linkHover1" })}
            >
              Chuyển đến số liệu phân tích
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
