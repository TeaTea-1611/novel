import { BookDocument, BookQuery } from "@/apollo-client/__generated";
import { getClient } from "@/app/apollo-client";
import { Book } from "./book";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const bookId = (await params).bookId;
  const { data } = await getClient().query<BookQuery>({
    query: BookDocument,
    variables: {
      bookId: parseInt(bookId),
    },
  });

  if (!data.book) {
    return <div></div>;
  }

  return (
    <div>
      <Book book={data.book} />
    </div>
  );
}
