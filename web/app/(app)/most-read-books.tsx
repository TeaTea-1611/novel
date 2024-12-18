import { BookFragment } from "@/apollo-client/__generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, ImageIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data?: (BookFragment & { readMonthly?: number | null })[];
  loading: boolean;
}

export const MostReadBooks = ({ data, loading }: Props) => {
  return (
    <div className="flex flex-col p-2 space-y-4 border shadow rounded-xl bg-card md:p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Lượt đọc</h2>
        <Button variant="linkHover2" asChild>
          <Link href={"/books/rank?type=read"}>Xem thêm</Link>
        </Button>
      </div>
      <Separator />
      <div className="">
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
              <div key={id} className="flex justify-start py-2 border-b">
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
                    <span>{i + 1}</span>
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
                    {isFirst && readMonthly && (
                      <div className="flex items-center">
                        <EyeIcon className="mr-2 size-4" />
                        <NumberTicker value={readMonthly} stiffness={500} />
                      </div>
                    )}
                  </div>
                  {isFirst && (
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <UserIcon className="mr-2 size-4" />
                        {author?.name ?? createdBy.nickname}
                      </div>
                      <Badge variant={"outline"}>{genre.name}</Badge>
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
                    readMonthly && (
                      <NumberTicker value={readMonthly} stiffness={500} />
                    )
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
