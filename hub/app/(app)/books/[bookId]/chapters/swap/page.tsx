"use client";

import { useChaptersQuery } from "@/apollo-client/__generated";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Chapters } from "./chapters";

export default function Page() {
  const params = useParams<{ bookId: string }>();
  const { data, loading } = useChaptersQuery({
    variables: {
      bookId: parseInt(params.bookId),
    },
    skip: !params.bookId,
  });

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>No chapters found</div>;

  return (
    <div className="p-4 mx-auto space-y-4 rounded-md shadow-md bg-card">
      <div className="flex items-center justify-between gap-x-2">
        <span className="mx-2 text-xl font-bold">Sắp xếp chương</span>
        <Button variant={"gooeyRight"} className="h-8" asChild>
          <Link
            href={`/books/${params.bookId}/chapters/create/${data.chapters.length + 1}`}
          >
            <PlusIcon className="mr-2 size-4" />
            Thêm chương
          </Link>
        </Button>
      </div>
      <Chapters
        bookId={parseInt(params.bookId)}
        initialData={data.chapters.map((chapter) => ({
          ...chapter,
          newOrder: chapter.order,
        }))}
      />
    </div>
  );
}
