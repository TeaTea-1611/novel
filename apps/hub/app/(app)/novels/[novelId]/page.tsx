import { Main } from "@/components/layout/main";
import { Suspense } from "react";
import { Book } from "./book.jsx";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Skeleton } from "@workspace/ui/components/skeleton";

export default function Page() {
  return (
    <Main fixed>
      <Suspense
        fallback={
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="flex w-44 flex-col gap-2">
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
                  <Skeleton className="h-8 w-full" />
                </div>
                <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
                  <Skeleton className="h-6 w-40" />
                </div>
                <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-6 w-36" />
                </div>
                <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
                  <Skeleton className="h-12 w-20" />
                  <Skeleton className="h-12 w-20" />
                  <Skeleton className="h-12 w-20" />
                </div>
                <div className="mx-auto flex flex-wrap items-start justify-center gap-1 sm:-mx-1 sm:justify-start">
                  <Skeleton className="h-7 w-36" />
                  <Skeleton className="h-7 w-36" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ScrollArea className="-m-4 flex-1 scroll-smooth px-4">
          <Book />
        </ScrollArea>
      </Suspense>
    </Main>
  );
}
