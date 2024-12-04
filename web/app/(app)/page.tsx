"use client";

import { useHomePageDataQuery } from "@/apollo-client/__generated";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Page() {
  const { data, loading } = useHomePageDataQuery();

  return (
    <div>
      <div className="flex flex-col p-2 space-y-4 border shadow rounded-xl bg-card md:p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Đề cử</h2>
          <Button variant="linkHover2" asChild>
            <Link href={"/books"}>Xem thêm</Link>
          </Button>
        </div>
        <Separator />
        <div className="grid gap-3 sm:grid-cols-2">
          {loading ? (
            <div></div>
          ) : (
            data?.paginatedBooks.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
