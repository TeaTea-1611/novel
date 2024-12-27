import { BookFragment } from "@/apollo-client/__generated";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

interface Props {
  data?: BookFragment[];
  loading: boolean;
}

export default function RecentUpdates({ data, loading }: Props) {
  return (
    <div className="flex flex-col p-2 space-y-4 border shadow rounded-xl bg-card md:p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Mới lên chương</h2>
        <Button variant="linkHover2" asChild>
          <Link href={"/books"}>Xem thêm</Link>
        </Button>
      </div>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Thể loại</TableHead>
            <TableHead>Tên truyện</TableHead>
            <TableHead className="hidden sm:table-cell">Tác giả</TableHead>
            <TableHead className="hidden sm:table-cell">Chương</TableHead>
            <TableHead className="text-right whitespace-nowrap">
              Lên chương
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? [...Array(10)].map((_, i) => (
                <TableRow key={i} className="h-[40.8px]">
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                </TableRow>
              ))
            : data?.map((book) => (
                <TableRow key={book.id} className="text-sm">
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {book.genre.name}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/books/${book.id}`}
                      className="text-base hover:text-primary line-clamp-1"
                    >
                      {book.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground whitespace-nowrap sm:table-cell">
                    {book.author?.name ?? book.createdBy.nickname}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground whitespace-nowrap sm:table-cell">
                    {book.chapterCnt}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    <span className="font-medium line-clamp-1">
                      {formatDistanceToNow(new Date(book.newChapterAt), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {/* {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="flex h-32 space-x-3">
                <Skeleton className="w-24 h-full" />
                <div className="flex flex-col flex-1 space-y-2">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-24 h-5" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                </div>
              </div>
            ))
          : data?.map((book) => <BookCard key={book.id} book={book} />)} */}
    </div>
  );
}
