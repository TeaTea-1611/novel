"use client";

import { useCreatedBooksQuery } from "@/apollo-client/__generated";
import Image from "next/image";
import { BookCard } from "./components/book-card";

export default function Page() {
  const { data, loading } = useCreatedBooksQuery({
    variables: {
      keyword: "",
      page: 1,
      take: 10,
    },
  });

  if (loading) {
    return <div></div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="grid gap-2">
      {data.createdBooks.books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
