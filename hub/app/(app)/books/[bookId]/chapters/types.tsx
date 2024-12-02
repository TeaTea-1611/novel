export type Chapter = {
  __typename?: "Chapter";
  id: number;
  bookId: number;
  title: string;
  order: number;
  unlockPrice: number;
  publishAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
