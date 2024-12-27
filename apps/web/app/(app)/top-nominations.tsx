import { BookFragment } from "@/apollo-client/__generated";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import NumberTicker from "@workspace/ui/components/number-ticker";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ImageIcon, TicketIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data?: (BookFragment & { nominateMonthly?: number | null })[];
  loading: boolean;
}

export const TopNominations = ({ data, loading }: Props) => {
  return (
    <div className="flex flex-col p-2 space-y-4 border shadow rounded-xl bg-card md:p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Đề cử</h2>
        <Button variant="linkHover2" asChild>
          <Link href={"/books/rank?type=nominate"}>Xem thêm</Link>
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
            const {
              id,
              name,
              nominateMonthly,
              author,
              createdBy,
              genre,
              poster,
            } = book;
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
                    {isFirst && nominateMonthly && (
                      <div className="flex items-center">
                        <TicketIcon className="mr-2 size-4" />
                        <NumberTicker value={nominateMonthly} stiffness={500} />
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
                    nominateMonthly && (
                      <NumberTicker value={nominateMonthly} stiffness={500} />
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
