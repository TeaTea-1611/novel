import { BookFragment } from "@/apollo-client/__generated";
import { BookCard } from "@/components/book-card";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";

interface Props {
  data?: BookFragment[];
  loading: boolean;
}

export default function EditorPicks({ data, loading }: Props) {
  return (
    <div className="flex flex-col p-2 space-y-4 border shadow rounded-xl bg-card md:p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">BTV Đề cử</h2>
        <Button variant="linkHover2" asChild>
          <Link href={"/books"}>Xem thêm</Link>
        </Button>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2">
        {loading
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
          : data?.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
