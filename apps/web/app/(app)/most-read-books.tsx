import { BookFragment } from "@/apollo-client/__generated";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import NumberTicker from "@workspace/ui/components/number-ticker";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { TextShimmer } from "@workspace/ui/components/text-shimmer";
import { EyeIcon, ImageIcon, LayersIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data?: (BookFragment & { readMonthly?: number | null })[];
  loading: boolean;
}

export const MostReadBooks = ({ data, loading }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <TextShimmer className="text-xl font-semibold tracking-tight" as={"h2"}>
          Lượt đọc
        </TextShimmer>
        <Button variant="linkHover2" asChild>
          <Link href={"/books/rank?type=read"}>Xem thêm</Link>
        </Button>
      </div>
      <article className="flex flex-col gap-2 p-2 transition-colors border shadow cursor-pointer rounded-xl bg-card">
        {loading ? (
          <>
            <div className="flex justify-start space-x-2 h-[144.8px]">
              <Skeleton className="size-5" />
              <div className="flex flex-col justify-between flex-1 h-full">
                <div className="space-y-2">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-20 h-5" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
              <Skeleton className="w-24 h-32" />
            </div>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 h-[40.8px]">
                <Skeleton className="size-5" />
                <Skeleton className="flex-1 h-5" />
                <Skeleton className="w-20 h-5" />
              </div>
            ))}
          </>
        ) : (
          data?.map((book, i) => {
            const isFirst = i === 0;
            const { id, name, readMonthly, author, createdBy, genre, poster } =
              book;
            return (
              <div key={id} className="flex justify-start py-2">
                <div className="flex items-center justify-center mr-2 size-6">
                  {isFirst ? (
                    <Image
                      src="/ranking-1.png"
                      alt="ranking-1"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {i + 1}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="space-y-1">
                    <Link
                      href={`/books/${id}`}
                      className="line-clamp-1 hover:text-primary"
                    >
                      {name}
                    </Link>
                    {isFirst && !!readMonthly && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <EyeIcon className="mr-2 size-4" />
                        <NumberTicker value={readMonthly} stiffness={500} />
                      </div>
                    )}
                  </div>
                  {isFirst && (
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <UserIcon className="mr-2 size-4" />
                        {author?.name ?? createdBy.nickname}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <LayersIcon className="mr-2 size-4" />
                        {genre.name}
                      </div>
                    </div>
                  )}
                </div>
                <div className="pl-2">
                  {isFirst ? (
                    <Link href={`/books/${id}`}>
                      <Avatar className="w-24 h-32 rounded-md hover:ring-2">
                        <AvatarImage src={poster} />
                        <AvatarFallback className="rounded-md">
                          <ImageIcon className="w-24 h-32" />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  ) : (
                    !!readMonthly && (
                      <NumberTicker
                        value={readMonthly}
                        stiffness={500}
                        className="text-sm text-muted-foreground"
                      />
                    )
                  )}
                </div>
              </div>
            );
          })
        )}
      </article>
    </div>
  );
};
