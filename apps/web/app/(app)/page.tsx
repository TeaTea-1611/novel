"use client";

import { useHomePageDataQuery } from "@/apollo-client/__generated";
import { EditorPicks } from "./editor-picks";
import { MostReadBooks } from "./most-read-books";
import { TopNominations } from "./top-nominations";
import RecentUpdates from "./recent-updates";

export default function Page() {
  const { data, loading } = useHomePageDataQuery({
    variables: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  });

  return (
    <>
      <EditorPicks data={data?.editorPicks.books} loading={loading} />
      <div className="grid gap-4 md:grid-cols-2">
        <MostReadBooks data={data?.mostReadBooks.books} loading={loading} />
        <TopNominations data={data?.topNominations.books} loading={loading} />
      </div>
      <RecentUpdates data={data?.recentUpdates.books} loading={loading} />
    </>
  );
}
