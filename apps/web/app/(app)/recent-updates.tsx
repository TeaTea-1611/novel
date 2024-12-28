import { BookFragment } from "@/apollo-client/__generated";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { TextShimmer } from "@workspace/ui/components/text-shimmer";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

interface Props {
  data?: BookFragment[];
  loading: boolean;
}

export default function RecentUpdates({ data, loading }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <TextShimmer className="text-xl font-semibold tracking-tight" as={"h2"}>
          Mới lên chương
        </TextShimmer>
        <Button variant="linkHover2" asChild>
          <Link href={"/books"}>Xem thêm</Link>
        </Button>
      </div>
      <Table className="p-2 transition-colors border shadow cursor-pointer rounded-xl bg-card overflow-hidden">
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
    </div>
  );
}
