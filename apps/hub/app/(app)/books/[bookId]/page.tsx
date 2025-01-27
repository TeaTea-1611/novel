import { Main } from "@/components/layout/main";
import { Suspense } from "react";
import { Book } from "./book";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Skeleton } from "@workspace/ui/components/skeleton";

export default function Page() {
  return (
    <Main fixed>
      <Suspense
        fallback={
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="flex flex-col gap-2 w-44">
                <Skeleton className="w-full h-60" />
                <Skeleton className="w-full h-8" />
              </div>
              <div className="flex flex-col flex-1 gap-3">
                <div className="flex flex-wrap items-start justify-center gap-1 mx-auto sm:justify-start sm:-mx-1">
                  <Skeleton className="w-full h-8" />
                </div>
                <div className="flex flex-wrap items-start justify-center gap-1 mx-auto sm:justify-start sm:-mx-1">
                  <Skeleton className="w-40 h-6" />
                </div>
                <div className="flex flex-wrap items-start justify-center gap-1 mx-auto sm:justify-start sm:-mx-1">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-32 h-6" />
                </div>
                <div className="flex flex-wrap items-start justify-center gap-1 mx-auto sm:justify-start sm:-mx-1">
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-6 w-36" />
                </div>
                <div className="flex flex-wrap items-start justify-center gap-1 mx-auto sm:justify-start sm:-mx-1">
                  <Skeleton className="w-20 h-12" />
                  <Skeleton className="w-20 h-12" />
                  <Skeleton className="w-20 h-12" />
                </div>
                <div className="flex flex-wrap items-start justify-center gap-1 mx-auto sm:justify-start sm:-mx-1">
                  <Skeleton className="h-7 w-36" />
                  <Skeleton className="h-7 w-36" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ScrollArea className="flex-1 px-4 -m-4 scroll-smooth">
          <Book />
        </ScrollArea>
      </Suspense>
    </Main>
  );
}
