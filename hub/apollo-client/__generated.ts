import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  authorId?: Maybe<Scalars['Int']['output']>;
  authorName: Scalars['String']['output'];
  chapterCnt: Scalars['Int']['output'];
  commentCnt: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  flowerCnt: Scalars['Int']['output'];
  gender: Scalars['Int']['output'];
  genre: Genre;
  genreId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  kind: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  newChapterAt: Scalars['Timestamp']['output'];
  originalLink: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  points: Scalars['Float']['output'];
  poster: Scalars['String']['output'];
  readCnt: Scalars['Int']['output'];
  reviewCnt: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  synopsis: Scalars['String']['output'];
  tags: Array<Tag>;
  wordCnt: Scalars['Int']['output'];
};

export type BookResponse = IMutationResponse & {
  __typename?: 'BookResponse';
  book?: Maybe<Book>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BookStatistic = {
  __typename?: 'BookStatistic';
  bookId: Scalars['Int']['output'];
  comment: Scalars['Int']['output'];
  date: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  read: Scalars['Int']['output'];
  review: Scalars['Int']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  bookId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  publishAt: Scalars['Timestamp']['output'];
  readCnt: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  unlockPrice: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ChapterMutationResponse = IMutationResponse & {
  __typename?: 'ChapterMutationResponse';
  chapter?: Maybe<Chapter>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  bookId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  totalLike: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  userId: Scalars['Int']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type IMutationResponse = {
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type LoginResponse = IMutationResponse & {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  twoFactor?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeAvatar: User;
  changePassword: MutationResponse;
  changePoster: Book;
  changeProfile: User;
  comment: Comment;
  convertBook: BookResponse;
  createBook: BookResponse;
  createChapter: ChapterMutationResponse;
  createGenre: Genre;
  createTag: Tag;
  createTagGroup: TagGroup;
  deleteBook: MutationResponse;
  deleteChapters: MutationResponse;
  deleteGenres: MutationResponse;
  deleteTagGroups: MutationResponse;
  deleteTags: MutationResponse;
  googleLogin: LoginResponse;
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  newPassword: MutationResponse;
  passwordReset: MutationResponse;
  read: Scalars['Boolean']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  register: MutationResponse;
  resendTwoFactorCode: MutationResponse;
  review: Review;
  swapChapters: Array<Chapter>;
  updateBook: BookResponse;
  updateChapter: ChapterMutationResponse;
  updateChapters: MutationResponse;
  updateConvertBook: BookResponse;
  updateCopyright?: Maybe<Scalars['Boolean']['output']>;
  updateGenre: Genre;
  updateNotificationSettings: NotificationSettings;
  updatePrivacyPolicy?: Maybe<Scalars['Boolean']['output']>;
  updateTag: Tag;
  updateTagGroup: TagGroup;
  updateTermsOfService?: Maybe<Scalars['Boolean']['output']>;
  updateTwoFactor: TwoFactorResponse;
  verification: MutationResponse;
};


export type MutationChangeAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationChangePosterArgs = {
  bookId: Scalars['Int']['input'];
  poster: Scalars['Upload']['input'];
};


export type MutationChangeProfileArgs = {
  dob: Scalars['Timestamp']['input'];
  gender: Scalars['Int']['input'];
  introduce: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  urls: Array<Scalars['String']['input']>;
};


export type MutationCommentArgs = {
  bookId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};


export type MutationConvertBookArgs = {
  authorName: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  originalAuthorName: Scalars['String']['input'];
  originalName: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  tagIds: Array<Scalars['Int']['input']>;
};


export type MutationCreateBookArgs = {
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  tagIds: Array<Scalars['Int']['input']>;
};


export type MutationCreateChapterArgs = {
  bookId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  publishAt: Scalars['Timestamp']['input'];
  title: Scalars['String']['input'];
  unlockPrice: Scalars['Int']['input'];
};


export type MutationCreateGenreArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTagArgs = {
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateTagGroupArgs = {
  bgColor: Scalars['String']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteBookArgs = {
  bookId: Scalars['Int']['input'];
};


export type MutationDeleteChaptersArgs = {
  bookId: Scalars['Int']['input'];
  chapterIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteGenresArgs = {
  genreIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteTagGroupsArgs = {
  tagGroupIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteTagsArgs = {
  tagIds: Array<Scalars['Int']['input']>;
};


export type MutationGoogleLoginArgs = {
  code: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationNewPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationReadArgs = {
  chapterId: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResendTwoFactorCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationReviewArgs = {
  bookId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  isSpoiler: Scalars['Boolean']['input'];
  point: Scalars['Int']['input'];
};


export type MutationSwapChaptersArgs = {
  bookId: Scalars['Int']['input'];
  data: Array<SwapChapterInput>;
};


export type MutationUpdateBookArgs = {
  bookId: Scalars['Int']['input'];
  gender?: InputMaybe<Scalars['Int']['input']>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  synopsis?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateChapterArgs = {
  bookId: Scalars['Int']['input'];
  chapterId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  publishAt: Scalars['Timestamp']['input'];
  title: Scalars['String']['input'];
  unlockPrice: Scalars['Int']['input'];
};


export type MutationUpdateChaptersArgs = {
  bookId: Scalars['Int']['input'];
  chapterIds: Array<Scalars['Int']['input']>;
  publishAt: Scalars['Timestamp']['input'];
  unlockPrice: Scalars['Int']['input'];
};


export type MutationUpdateConvertBookArgs = {
  authorName: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  originalAuthorName: Scalars['String']['input'];
  originalName: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  tagIds: Array<Scalars['Int']['input']>;
};


export type MutationUpdateCopyrightArgs = {
  value: Scalars['String']['input'];
};


export type MutationUpdateGenreArgs = {
  genreId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateNotificationSettingsArgs = {
  newChapter: Scalars['Boolean']['input'];
  newInteraction: Scalars['Boolean']['input'];
};


export type MutationUpdatePrivacyPolicyArgs = {
  value: Scalars['String']['input'];
};


export type MutationUpdateTagArgs = {
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  tagId: Scalars['Int']['input'];
};


export type MutationUpdateTagGroupArgs = {
  bgColor: Scalars['String']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagGroupId: Scalars['Int']['input'];
};


export type MutationUpdateTermsOfServiceArgs = {
  value: Scalars['String']['input'];
};


export type MutationUpdateTwoFactorArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  isTwoFactorEnable: Scalars['Boolean']['input'];
};


export type MutationVerificationArgs = {
  token: Scalars['String']['input'];
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  newChapter: Scalars['Boolean']['output'];
  newInteraction: Scalars['Boolean']['output'];
  userId: Scalars['Int']['output'];
};

export type PaginatedBooksResponse = {
  __typename?: 'PaginatedBooksResponse';
  books: Array<Book>;
  next?: Maybe<Scalars['Int']['output']>;
  prev?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedReading = {
  __typename?: 'PaginatedReading';
  cursor?: Maybe<Scalars['Timestamp']['output']>;
  hasMore: Scalars['Boolean']['output'];
  reading: Array<Reading>;
  totalCount: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  analytics: Array<BookStatistic>;
  book?: Maybe<Book>;
  chapter?: Maybe<Chapter>;
  chapters: Array<Chapter>;
  comments: Array<Comment>;
  copyright?: Maybe<Scalars['String']['output']>;
  createdBooks: PaginatedBooksResponse;
  genders: Array<Scalars['Int']['output']>;
  genres: Array<Genre>;
  kinds: Array<Scalars['Int']['output']>;
  me?: Maybe<User>;
  notificationSettings: NotificationSettings;
  paginatedBooks: PaginatedBooksResponse;
  privacyPolicy?: Maybe<Scalars['String']['output']>;
  reading: PaginatedReading;
  reviews: Array<Review>;
  status: Array<Scalars['Int']['output']>;
  tagGroups: Array<TagGroup>;
  tags: Array<Tag>;
  termsOfService?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};


export type QueryBookArgs = {
  bookId: Scalars['Int']['input'];
};


export type QueryChapterArgs = {
  chapterId: Scalars['Int']['input'];
};


export type QueryChaptersArgs = {
  bookId: Scalars['Int']['input'];
};


export type QueryCommentsArgs = {
  bookId: Scalars['Int']['input'];
};


export type QueryCreatedBooksArgs = {
  gender?: InputMaybe<Scalars['Int']['input']>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  keyword?: Scalars['String']['input'];
  page?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  take?: Scalars['Int']['input'];
};


export type QueryPaginatedBooksArgs = {
  gender?: InputMaybe<Scalars['Int']['input']>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  keyword?: Scalars['String']['input'];
  page?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  take?: Scalars['Int']['input'];
};


export type QueryReadingArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  take: Scalars['Int']['input'];
};


export type QueryReviewsArgs = {
  bookId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
};

export type Reading = {
  __typename?: 'Reading';
  book: Book;
  bookId: Scalars['Int']['output'];
  currentChapter: Scalars['Int']['output'];
  readingAt: Scalars['Timestamp']['output'];
  userId: Scalars['Int']['output'];
};

export type Review = {
  __typename?: 'Review';
  bookId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  isSpoiler: Scalars['Boolean']['output'];
  point: Scalars['Float']['output'];
  userId: Scalars['Int']['output'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SwapChapterInput = {
  id: Scalars['Int']['input'];
  newOrder: Scalars['Int']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  group: TagGroup;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TagGroup = {
  __typename?: 'TagGroup';
  bgColor: Scalars['String']['output'];
  color: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TwoFactorResponse = IMutationResponse & {
  __typename?: 'TwoFactorResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  twoFactor?: Maybe<Scalars['Boolean']['output']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  candyNum: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  dob: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Timestamp']['output']>;
  gender: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  introduce: Scalars['String']['output'];
  isTwoFactorEnable: Scalars['Boolean']['output'];
  keyNum: Scalars['Int']['output'];
  nickname: Scalars['String']['output'];
  notificationSettings: NotificationSettings;
  pendant: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: UserRole;
  ticketNum: Scalars['Int']['output'];
  urls: Array<Scalars['String']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Converter = 'CONVERTER',
  Editor = 'EDITOR',
  User = 'USER'
}

export type BookFragment = { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } };

export type ChapterFragment = { __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any };

export type UserFragment = { __typename?: 'User', id: number, email: string, nickname: string, avatar: string, pendant: string, role: UserRole, emailVerified?: any | null, isTwoFactorEnable: boolean, gender: number, introduce: string, phone: string, dob: any, urls: Array<string>, keyNum: number, ticketNum: number, candyNum: number, createdAt: any };

export type CreateGenreMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateGenreMutation = { __typename?: 'Mutation', createGenre: { __typename?: 'Genre', id: number, name: string } };

export type UpdateGenreMutationVariables = Exact<{
  name: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
}>;


export type UpdateGenreMutation = { __typename?: 'Mutation', updateGenre: { __typename?: 'Genre', id: number, name: string } };

export type DeleteGenresMutationVariables = Exact<{
  genreIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteGenresMutation = { __typename?: 'Mutation', deleteGenres: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateTagMutationVariables = Exact<{
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: number, groupId: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string, bgColor: string } } };

export type UpdateTagMutationVariables = Exact<{
  groupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  tagId: Scalars['Int']['input'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', id: number, groupId: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string, bgColor: string } } };

export type DeleteTagsMutationVariables = Exact<{
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteTagsMutation = { __typename?: 'Mutation', deleteTags: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateTagGroupMutationVariables = Exact<{
  bgColor: Scalars['String']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateTagGroupMutation = { __typename?: 'Mutation', createTagGroup: { __typename?: 'TagGroup', id: number, name: string, color: string, bgColor: string } };

export type UpdateTagGroupMutationVariables = Exact<{
  bgColor: Scalars['String']['input'];
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagGroupId: Scalars['Int']['input'];
}>;


export type UpdateTagGroupMutation = { __typename?: 'Mutation', updateTagGroup: { __typename?: 'TagGroup', id: number, name: string, color: string, bgColor: string } };

export type DeleteTagGroupsMutationVariables = Exact<{
  tagGroupIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteTagGroupsMutation = { __typename?: 'Mutation', deleteTagGroups: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type TagGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagGroupsQuery = { __typename?: 'Query', tagGroups: Array<{ __typename?: 'TagGroup', id: number, name: string, color: string, bgColor: string }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: string | null };

export type CreateBookMutationVariables = Exact<{
  name: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook: { __typename?: 'BookResponse', success: boolean, message: string, book?: { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } } | null } };

export type UpdateBookMutationVariables = Exact<{
  bookId: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  synopsis?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook: { __typename?: 'BookResponse', success: boolean, message: string, book?: { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } } | null } };

export type ConvertBookMutationVariables = Exact<{
  name: Scalars['String']['input'];
  originalName: Scalars['String']['input'];
  authorName: Scalars['String']['input'];
  originalAuthorName: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type ConvertBookMutation = { __typename?: 'Mutation', convertBook: { __typename?: 'BookResponse', success: boolean, message: string, book?: { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } } | null } };

export type UpdateConvertBookMutationVariables = Exact<{
  name: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  originalName: Scalars['String']['input'];
  authorName: Scalars['String']['input'];
  originalAuthorName: Scalars['String']['input'];
  id: Scalars['Int']['input'];
}>;


export type UpdateConvertBookMutation = { __typename?: 'Mutation', updateConvertBook: { __typename?: 'BookResponse', success: boolean, message: string, book?: { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } } | null } };

export type ChangePosterMutationVariables = Exact<{
  poster: Scalars['Upload']['input'];
  bookId: Scalars['Int']['input'];
}>;


export type ChangePosterMutation = { __typename?: 'Mutation', changePoster: { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } } };

export type DeleteBookMutationVariables = Exact<{
  bookId: Scalars['Int']['input'];
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type CreateChapterMutationVariables = Exact<{
  bookId: Scalars['Int']['input'];
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  publishAt: Scalars['Timestamp']['input'];
  unlockPrice: Scalars['Int']['input'];
}>;


export type CreateChapterMutation = { __typename?: 'Mutation', createChapter: { __typename?: 'ChapterMutationResponse', success: boolean, message: string, chapter?: { __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any } | null } };

export type SwapChaptersMutationVariables = Exact<{
  bookId: Scalars['Int']['input'];
  data: Array<SwapChapterInput> | SwapChapterInput;
}>;


export type SwapChaptersMutation = { __typename?: 'Mutation', swapChapters: Array<{ __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any }> };

export type UpdateChapterMutationVariables = Exact<{
  bookId: Scalars['Int']['input'];
  chapterId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  publishAt: Scalars['Timestamp']['input'];
  unlockPrice: Scalars['Int']['input'];
}>;


export type UpdateChapterMutation = { __typename?: 'Mutation', updateChapter: { __typename?: 'ChapterMutationResponse', success: boolean, message: string, chapter?: { __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any } | null } };

export type DeleteChaptersMutationVariables = Exact<{
  chapterIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  bookId: Scalars['Int']['input'];
}>;


export type DeleteChaptersMutation = { __typename?: 'Mutation', deleteChapters: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateChaptersMutationVariables = Exact<{
  publishAt: Scalars['Timestamp']['input'];
  unlockPrice: Scalars['Int']['input'];
  chapterIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  bookId: Scalars['Int']['input'];
}>;


export type UpdateChaptersMutation = { __typename?: 'Mutation', updateChapters: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type AnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AnalyticsQuery = { __typename?: 'Query', analytics: Array<{ __typename?: 'BookStatistic', id: number, bookId: number, date: any, read: number, comment: number, review: number }> };

export type BookOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookOptionsQuery = { __typename?: 'Query', kinds: Array<number>, genders: Array<number>, status: Array<number>, genres: Array<{ __typename?: 'Genre', id: number, name: string }>, tags: Array<{ __typename?: 'Tag', id: number, name: string, groupId: number, group: { __typename?: 'TagGroup', id: number, name: string, color: string, bgColor: string } }> };

export type BookQueryVariables = Exact<{
  bookId: Scalars['Int']['input'];
}>;


export type BookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } } | null };

export type CreatedBooksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  keyword: Scalars['String']['input'];
  genreId?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
}>;


export type CreatedBooksQuery = { __typename?: 'Query', createdBooks: { __typename?: 'PaginatedBooksResponse', total: number, books: Array<{ __typename?: 'Book', id: number, name: string, originalName: string, synopsis: string, poster: string, kind: number, gender: number, status: number, wordCnt: number, flowerCnt: number, readCnt: number, reviewCnt: number, chapterCnt: number, commentCnt: number, points: number, createdAt: any, newChapterAt: any, author?: { __typename?: 'Author', id: number, name: string, originalName: string } | null, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, pendant: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }>, genre: { __typename?: 'Genre', id: number, name: string } }> } };

export type ChapterQueryVariables = Exact<{
  chapterId: Scalars['Int']['input'];
}>;


export type ChapterQuery = { __typename?: 'Query', chapter?: { __typename?: 'Chapter', content: string, id: number, bookId: number, order: number, title: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any } | null };

export type ChaptersQueryVariables = Exact<{
  bookId: Scalars['Int']['input'];
}>;


export type ChaptersQuery = { __typename?: 'Query', chapters: Array<{ __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any }> };

export type FullQueryVariables = Exact<{ [key: string]: never; }>;


export type FullQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string, nickname: string, avatar: string, pendant: string, role: UserRole, emailVerified?: any | null, isTwoFactorEnable: boolean, gender: number, introduce: string, phone: string, dob: any, urls: Array<string>, keyNum: number, ticketNum: number, candyNum: number, createdAt: any } | null };

export const BookFragmentDoc = gql`
    fragment book on Book {
  id
  name
  originalName
  synopsis
  poster
  kind
  gender
  status
  wordCnt
  flowerCnt
  readCnt
  reviewCnt
  chapterCnt
  commentCnt
  points
  createdAt
  newChapterAt
  author {
    id
    name
    originalName
  }
  createdBy {
    id
    nickname
    avatar
    pendant
  }
  tags {
    id
    name
    group {
      name
      color
      bgColor
    }
  }
  genre {
    id
    name
  }
}
    `;
export const ChapterFragmentDoc = gql`
    fragment chapter on Chapter {
  id
  bookId
  order
  title
  unlockPrice
  publishAt
  createdAt
  updatedAt
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  email
  nickname
  avatar
  pendant
  role
  emailVerified
  isTwoFactorEnable
  gender
  introduce
  phone
  dob
  urls
  keyNum
  ticketNum
  candyNum
  createdAt
}
    `;
export const CreateGenreDocument = gql`
    mutation CreateGenre($name: String!) {
  createGenre(name: $name) {
    id
    name
  }
}
    `;
export type CreateGenreMutationFn = Apollo.MutationFunction<CreateGenreMutation, CreateGenreMutationVariables>;

/**
 * __useCreateGenreMutation__
 *
 * To run a mutation, you first call `useCreateGenreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGenreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGenreMutation, { data, loading, error }] = useCreateGenreMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateGenreMutation(baseOptions?: Apollo.MutationHookOptions<CreateGenreMutation, CreateGenreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGenreMutation, CreateGenreMutationVariables>(CreateGenreDocument, options);
      }
export type CreateGenreMutationHookResult = ReturnType<typeof useCreateGenreMutation>;
export type CreateGenreMutationResult = Apollo.MutationResult<CreateGenreMutation>;
export type CreateGenreMutationOptions = Apollo.BaseMutationOptions<CreateGenreMutation, CreateGenreMutationVariables>;
export const UpdateGenreDocument = gql`
    mutation UpdateGenre($name: String!, $genreId: Int!) {
  updateGenre(name: $name, genreId: $genreId) {
    id
    name
  }
}
    `;
export type UpdateGenreMutationFn = Apollo.MutationFunction<UpdateGenreMutation, UpdateGenreMutationVariables>;

/**
 * __useUpdateGenreMutation__
 *
 * To run a mutation, you first call `useUpdateGenreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGenreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGenreMutation, { data, loading, error }] = useUpdateGenreMutation({
 *   variables: {
 *      name: // value for 'name'
 *      genreId: // value for 'genreId'
 *   },
 * });
 */
export function useUpdateGenreMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGenreMutation, UpdateGenreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGenreMutation, UpdateGenreMutationVariables>(UpdateGenreDocument, options);
      }
export type UpdateGenreMutationHookResult = ReturnType<typeof useUpdateGenreMutation>;
export type UpdateGenreMutationResult = Apollo.MutationResult<UpdateGenreMutation>;
export type UpdateGenreMutationOptions = Apollo.BaseMutationOptions<UpdateGenreMutation, UpdateGenreMutationVariables>;
export const DeleteGenresDocument = gql`
    mutation DeleteGenres($genreIds: [Int!]!) {
  deleteGenres(genreIds: $genreIds) {
    success
    message
  }
}
    `;
export type DeleteGenresMutationFn = Apollo.MutationFunction<DeleteGenresMutation, DeleteGenresMutationVariables>;

/**
 * __useDeleteGenresMutation__
 *
 * To run a mutation, you first call `useDeleteGenresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGenresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGenresMutation, { data, loading, error }] = useDeleteGenresMutation({
 *   variables: {
 *      genreIds: // value for 'genreIds'
 *   },
 * });
 */
export function useDeleteGenresMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGenresMutation, DeleteGenresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGenresMutation, DeleteGenresMutationVariables>(DeleteGenresDocument, options);
      }
export type DeleteGenresMutationHookResult = ReturnType<typeof useDeleteGenresMutation>;
export type DeleteGenresMutationResult = Apollo.MutationResult<DeleteGenresMutation>;
export type DeleteGenresMutationOptions = Apollo.BaseMutationOptions<DeleteGenresMutation, DeleteGenresMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($groupId: Int!, $name: String!) {
  createTag(groupId: $groupId, name: $name) {
    id
    groupId
    name
    groupId
    group {
      id
      name
      color
      bgColor
    }
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = gql`
    mutation UpdateTag($groupId: Int!, $name: String!, $tagId: Int!) {
  updateTag(groupId: $groupId, name: $name, tagId: $tagId) {
    id
    groupId
    name
    groupId
    group {
      id
      name
      color
      bgColor
    }
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      name: // value for 'name'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;
export const DeleteTagsDocument = gql`
    mutation DeleteTags($tagIds: [Int!]!) {
  deleteTags(tagIds: $tagIds) {
    success
    message
  }
}
    `;
export type DeleteTagsMutationFn = Apollo.MutationFunction<DeleteTagsMutation, DeleteTagsMutationVariables>;

/**
 * __useDeleteTagsMutation__
 *
 * To run a mutation, you first call `useDeleteTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagsMutation, { data, loading, error }] = useDeleteTagsMutation({
 *   variables: {
 *      tagIds: // value for 'tagIds'
 *   },
 * });
 */
export function useDeleteTagsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagsMutation, DeleteTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagsMutation, DeleteTagsMutationVariables>(DeleteTagsDocument, options);
      }
export type DeleteTagsMutationHookResult = ReturnType<typeof useDeleteTagsMutation>;
export type DeleteTagsMutationResult = Apollo.MutationResult<DeleteTagsMutation>;
export type DeleteTagsMutationOptions = Apollo.BaseMutationOptions<DeleteTagsMutation, DeleteTagsMutationVariables>;
export const CreateTagGroupDocument = gql`
    mutation CreateTagGroup($bgColor: String!, $color: String!, $name: String!) {
  createTagGroup(bgColor: $bgColor, color: $color, name: $name) {
    id
    name
    color
    bgColor
  }
}
    `;
export type CreateTagGroupMutationFn = Apollo.MutationFunction<CreateTagGroupMutation, CreateTagGroupMutationVariables>;

/**
 * __useCreateTagGroupMutation__
 *
 * To run a mutation, you first call `useCreateTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagGroupMutation, { data, loading, error }] = useCreateTagGroupMutation({
 *   variables: {
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagGroupMutation, CreateTagGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagGroupMutation, CreateTagGroupMutationVariables>(CreateTagGroupDocument, options);
      }
export type CreateTagGroupMutationHookResult = ReturnType<typeof useCreateTagGroupMutation>;
export type CreateTagGroupMutationResult = Apollo.MutationResult<CreateTagGroupMutation>;
export type CreateTagGroupMutationOptions = Apollo.BaseMutationOptions<CreateTagGroupMutation, CreateTagGroupMutationVariables>;
export const UpdateTagGroupDocument = gql`
    mutation UpdateTagGroup($bgColor: String!, $color: String!, $name: String!, $tagGroupId: Int!) {
  updateTagGroup(
    bgColor: $bgColor
    color: $color
    name: $name
    tagGroupId: $tagGroupId
  ) {
    id
    name
    color
    bgColor
  }
}
    `;
export type UpdateTagGroupMutationFn = Apollo.MutationFunction<UpdateTagGroupMutation, UpdateTagGroupMutationVariables>;

/**
 * __useUpdateTagGroupMutation__
 *
 * To run a mutation, you first call `useUpdateTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagGroupMutation, { data, loading, error }] = useUpdateTagGroupMutation({
 *   variables: {
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *      name: // value for 'name'
 *      tagGroupId: // value for 'tagGroupId'
 *   },
 * });
 */
export function useUpdateTagGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagGroupMutation, UpdateTagGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagGroupMutation, UpdateTagGroupMutationVariables>(UpdateTagGroupDocument, options);
      }
export type UpdateTagGroupMutationHookResult = ReturnType<typeof useUpdateTagGroupMutation>;
export type UpdateTagGroupMutationResult = Apollo.MutationResult<UpdateTagGroupMutation>;
export type UpdateTagGroupMutationOptions = Apollo.BaseMutationOptions<UpdateTagGroupMutation, UpdateTagGroupMutationVariables>;
export const DeleteTagGroupsDocument = gql`
    mutation DeleteTagGroups($tagGroupIds: [Int!]!) {
  deleteTagGroups(tagGroupIds: $tagGroupIds) {
    success
    message
  }
}
    `;
export type DeleteTagGroupsMutationFn = Apollo.MutationFunction<DeleteTagGroupsMutation, DeleteTagGroupsMutationVariables>;

/**
 * __useDeleteTagGroupsMutation__
 *
 * To run a mutation, you first call `useDeleteTagGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagGroupsMutation, { data, loading, error }] = useDeleteTagGroupsMutation({
 *   variables: {
 *      tagGroupIds: // value for 'tagGroupIds'
 *   },
 * });
 */
export function useDeleteTagGroupsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagGroupsMutation, DeleteTagGroupsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagGroupsMutation, DeleteTagGroupsMutationVariables>(DeleteTagGroupsDocument, options);
      }
export type DeleteTagGroupsMutationHookResult = ReturnType<typeof useDeleteTagGroupsMutation>;
export type DeleteTagGroupsMutationResult = Apollo.MutationResult<DeleteTagGroupsMutation>;
export type DeleteTagGroupsMutationOptions = Apollo.BaseMutationOptions<DeleteTagGroupsMutation, DeleteTagGroupsMutationVariables>;
export const TagGroupsDocument = gql`
    query TagGroups {
  tagGroups {
    id
    name
    color
    bgColor
  }
}
    `;

/**
 * __useTagGroupsQuery__
 *
 * To run a query within a React component, call `useTagGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagGroupsQuery(baseOptions?: Apollo.QueryHookOptions<TagGroupsQuery, TagGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagGroupsQuery, TagGroupsQueryVariables>(TagGroupsDocument, options);
      }
export function useTagGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagGroupsQuery, TagGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagGroupsQuery, TagGroupsQueryVariables>(TagGroupsDocument, options);
        }
export function useTagGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TagGroupsQuery, TagGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagGroupsQuery, TagGroupsQueryVariables>(TagGroupsDocument, options);
        }
export type TagGroupsQueryHookResult = ReturnType<typeof useTagGroupsQuery>;
export type TagGroupsLazyQueryHookResult = ReturnType<typeof useTagGroupsLazyQuery>;
export type TagGroupsSuspenseQueryHookResult = ReturnType<typeof useTagGroupsSuspenseQuery>;
export type TagGroupsQueryResult = Apollo.QueryResult<TagGroupsQuery, TagGroupsQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateBookDocument = gql`
    mutation CreateBook($name: String!, $synopsis: String!, $gender: Int!, $genreId: Int!, $tagIds: [Int!]!) {
  createBook(
    name: $name
    synopsis: $synopsis
    gender: $gender
    genreId: $genreId
    tagIds: $tagIds
  ) {
    success
    message
    book {
      ...book
    }
  }
}
    ${BookFragmentDoc}`;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      name: // value for 'name'
 *      synopsis: // value for 'synopsis'
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;
export const UpdateBookDocument = gql`
    mutation UpdateBook($bookId: Int!, $status: Int, $name: String, $synopsis: String, $gender: Int, $genreId: Int, $tagIds: [Int!]) {
  updateBook(
    bookId: $bookId
    status: $status
    name: $name
    synopsis: $synopsis
    gender: $gender
    genreId: $genreId
    tagIds: $tagIds
  ) {
    success
    message
    book {
      ...book
    }
  }
}
    ${BookFragmentDoc}`;
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>;

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      status: // value for 'status'
 *      name: // value for 'name'
 *      synopsis: // value for 'synopsis'
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *   },
 * });
 */
export function useUpdateBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options);
      }
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>;
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>;
export const ConvertBookDocument = gql`
    mutation ConvertBook($name: String!, $originalName: String!, $authorName: String!, $originalAuthorName: String!, $synopsis: String!, $gender: Int!, $genreId: Int!, $tagIds: [Int!]!) {
  convertBook(
    name: $name
    originalName: $originalName
    authorName: $authorName
    originalAuthorName: $originalAuthorName
    synopsis: $synopsis
    gender: $gender
    genreId: $genreId
    tagIds: $tagIds
  ) {
    success
    message
    book {
      ...book
    }
  }
}
    ${BookFragmentDoc}`;
export type ConvertBookMutationFn = Apollo.MutationFunction<ConvertBookMutation, ConvertBookMutationVariables>;

/**
 * __useConvertBookMutation__
 *
 * To run a mutation, you first call `useConvertBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertBookMutation, { data, loading, error }] = useConvertBookMutation({
 *   variables: {
 *      name: // value for 'name'
 *      originalName: // value for 'originalName'
 *      authorName: // value for 'authorName'
 *      originalAuthorName: // value for 'originalAuthorName'
 *      synopsis: // value for 'synopsis'
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *   },
 * });
 */
export function useConvertBookMutation(baseOptions?: Apollo.MutationHookOptions<ConvertBookMutation, ConvertBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConvertBookMutation, ConvertBookMutationVariables>(ConvertBookDocument, options);
      }
export type ConvertBookMutationHookResult = ReturnType<typeof useConvertBookMutation>;
export type ConvertBookMutationResult = Apollo.MutationResult<ConvertBookMutation>;
export type ConvertBookMutationOptions = Apollo.BaseMutationOptions<ConvertBookMutation, ConvertBookMutationVariables>;
export const UpdateConvertBookDocument = gql`
    mutation UpdateConvertBook($name: String!, $synopsis: String!, $gender: Int!, $genreId: Int!, $tagIds: [Int!]!, $originalName: String!, $authorName: String!, $originalAuthorName: String!, $id: Int!) {
  updateConvertBook(
    name: $name
    synopsis: $synopsis
    gender: $gender
    genreId: $genreId
    tagIds: $tagIds
    originalName: $originalName
    authorName: $authorName
    originalAuthorName: $originalAuthorName
    id: $id
  ) {
    success
    message
    book {
      ...book
    }
  }
}
    ${BookFragmentDoc}`;
export type UpdateConvertBookMutationFn = Apollo.MutationFunction<UpdateConvertBookMutation, UpdateConvertBookMutationVariables>;

/**
 * __useUpdateConvertBookMutation__
 *
 * To run a mutation, you first call `useUpdateConvertBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConvertBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConvertBookMutation, { data, loading, error }] = useUpdateConvertBookMutation({
 *   variables: {
 *      name: // value for 'name'
 *      synopsis: // value for 'synopsis'
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *      originalName: // value for 'originalName'
 *      authorName: // value for 'authorName'
 *      originalAuthorName: // value for 'originalAuthorName'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateConvertBookMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConvertBookMutation, UpdateConvertBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConvertBookMutation, UpdateConvertBookMutationVariables>(UpdateConvertBookDocument, options);
      }
export type UpdateConvertBookMutationHookResult = ReturnType<typeof useUpdateConvertBookMutation>;
export type UpdateConvertBookMutationResult = Apollo.MutationResult<UpdateConvertBookMutation>;
export type UpdateConvertBookMutationOptions = Apollo.BaseMutationOptions<UpdateConvertBookMutation, UpdateConvertBookMutationVariables>;
export const ChangePosterDocument = gql`
    mutation ChangePoster($poster: Upload!, $bookId: Int!) {
  changePoster(poster: $poster, bookId: $bookId) {
    ...book
  }
}
    ${BookFragmentDoc}`;
export type ChangePosterMutationFn = Apollo.MutationFunction<ChangePosterMutation, ChangePosterMutationVariables>;

/**
 * __useChangePosterMutation__
 *
 * To run a mutation, you first call `useChangePosterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePosterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePosterMutation, { data, loading, error }] = useChangePosterMutation({
 *   variables: {
 *      poster: // value for 'poster'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useChangePosterMutation(baseOptions?: Apollo.MutationHookOptions<ChangePosterMutation, ChangePosterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePosterMutation, ChangePosterMutationVariables>(ChangePosterDocument, options);
      }
export type ChangePosterMutationHookResult = ReturnType<typeof useChangePosterMutation>;
export type ChangePosterMutationResult = Apollo.MutationResult<ChangePosterMutation>;
export type ChangePosterMutationOptions = Apollo.BaseMutationOptions<ChangePosterMutation, ChangePosterMutationVariables>;
export const DeleteBookDocument = gql`
    mutation DeleteBook($bookId: Int!) {
  deleteBook(bookId: $bookId) {
    success
    message
  }
}
    `;
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useDeleteBookMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options);
      }
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>;
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>;
export const CreateChapterDocument = gql`
    mutation CreateChapter($bookId: Int!, $order: Int!, $title: String!, $content: String!, $publishAt: Timestamp!, $unlockPrice: Int!) {
  createChapter(
    bookId: $bookId
    order: $order
    title: $title
    content: $content
    publishAt: $publishAt
    unlockPrice: $unlockPrice
  ) {
    success
    message
    chapter {
      ...chapter
    }
  }
}
    ${ChapterFragmentDoc}`;
export type CreateChapterMutationFn = Apollo.MutationFunction<CreateChapterMutation, CreateChapterMutationVariables>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      order: // value for 'order'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      publishAt: // value for 'publishAt'
 *      unlockPrice: // value for 'unlockPrice'
 *   },
 * });
 */
export function useCreateChapterMutation(baseOptions?: Apollo.MutationHookOptions<CreateChapterMutation, CreateChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChapterMutation, CreateChapterMutationVariables>(CreateChapterDocument, options);
      }
export type CreateChapterMutationHookResult = ReturnType<typeof useCreateChapterMutation>;
export type CreateChapterMutationResult = Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<CreateChapterMutation, CreateChapterMutationVariables>;
export const SwapChaptersDocument = gql`
    mutation SwapChapters($bookId: Int!, $data: [SwapChapterInput!]!) {
  swapChapters(bookId: $bookId, data: $data) {
    ...chapter
  }
}
    ${ChapterFragmentDoc}`;
export type SwapChaptersMutationFn = Apollo.MutationFunction<SwapChaptersMutation, SwapChaptersMutationVariables>;

/**
 * __useSwapChaptersMutation__
 *
 * To run a mutation, you first call `useSwapChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwapChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [swapChaptersMutation, { data, loading, error }] = useSwapChaptersMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSwapChaptersMutation(baseOptions?: Apollo.MutationHookOptions<SwapChaptersMutation, SwapChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwapChaptersMutation, SwapChaptersMutationVariables>(SwapChaptersDocument, options);
      }
export type SwapChaptersMutationHookResult = ReturnType<typeof useSwapChaptersMutation>;
export type SwapChaptersMutationResult = Apollo.MutationResult<SwapChaptersMutation>;
export type SwapChaptersMutationOptions = Apollo.BaseMutationOptions<SwapChaptersMutation, SwapChaptersMutationVariables>;
export const UpdateChapterDocument = gql`
    mutation UpdateChapter($bookId: Int!, $chapterId: Int!, $title: String!, $content: String!, $publishAt: Timestamp!, $unlockPrice: Int!) {
  updateChapter(
    bookId: $bookId
    chapterId: $chapterId
    title: $title
    content: $content
    publishAt: $publishAt
    unlockPrice: $unlockPrice
  ) {
    success
    message
    chapter {
      ...chapter
    }
  }
}
    ${ChapterFragmentDoc}`;
export type UpdateChapterMutationFn = Apollo.MutationFunction<UpdateChapterMutation, UpdateChapterMutationVariables>;

/**
 * __useUpdateChapterMutation__
 *
 * To run a mutation, you first call `useUpdateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChapterMutation, { data, loading, error }] = useUpdateChapterMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      chapterId: // value for 'chapterId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      publishAt: // value for 'publishAt'
 *      unlockPrice: // value for 'unlockPrice'
 *   },
 * });
 */
export function useUpdateChapterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChapterMutation, UpdateChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChapterMutation, UpdateChapterMutationVariables>(UpdateChapterDocument, options);
      }
export type UpdateChapterMutationHookResult = ReturnType<typeof useUpdateChapterMutation>;
export type UpdateChapterMutationResult = Apollo.MutationResult<UpdateChapterMutation>;
export type UpdateChapterMutationOptions = Apollo.BaseMutationOptions<UpdateChapterMutation, UpdateChapterMutationVariables>;
export const DeleteChaptersDocument = gql`
    mutation DeleteChapters($chapterIds: [Int!]!, $bookId: Int!) {
  deleteChapters(chapterIds: $chapterIds, bookId: $bookId) {
    success
    message
  }
}
    `;
export type DeleteChaptersMutationFn = Apollo.MutationFunction<DeleteChaptersMutation, DeleteChaptersMutationVariables>;

/**
 * __useDeleteChaptersMutation__
 *
 * To run a mutation, you first call `useDeleteChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChaptersMutation, { data, loading, error }] = useDeleteChaptersMutation({
 *   variables: {
 *      chapterIds: // value for 'chapterIds'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useDeleteChaptersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChaptersMutation, DeleteChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChaptersMutation, DeleteChaptersMutationVariables>(DeleteChaptersDocument, options);
      }
export type DeleteChaptersMutationHookResult = ReturnType<typeof useDeleteChaptersMutation>;
export type DeleteChaptersMutationResult = Apollo.MutationResult<DeleteChaptersMutation>;
export type DeleteChaptersMutationOptions = Apollo.BaseMutationOptions<DeleteChaptersMutation, DeleteChaptersMutationVariables>;
export const UpdateChaptersDocument = gql`
    mutation UpdateChapters($publishAt: Timestamp!, $unlockPrice: Int!, $chapterIds: [Int!]!, $bookId: Int!) {
  updateChapters(
    publishAt: $publishAt
    unlockPrice: $unlockPrice
    chapterIds: $chapterIds
    bookId: $bookId
  ) {
    success
    message
  }
}
    `;
export type UpdateChaptersMutationFn = Apollo.MutationFunction<UpdateChaptersMutation, UpdateChaptersMutationVariables>;

/**
 * __useUpdateChaptersMutation__
 *
 * To run a mutation, you first call `useUpdateChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChaptersMutation, { data, loading, error }] = useUpdateChaptersMutation({
 *   variables: {
 *      publishAt: // value for 'publishAt'
 *      unlockPrice: // value for 'unlockPrice'
 *      chapterIds: // value for 'chapterIds'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useUpdateChaptersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChaptersMutation, UpdateChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChaptersMutation, UpdateChaptersMutationVariables>(UpdateChaptersDocument, options);
      }
export type UpdateChaptersMutationHookResult = ReturnType<typeof useUpdateChaptersMutation>;
export type UpdateChaptersMutationResult = Apollo.MutationResult<UpdateChaptersMutation>;
export type UpdateChaptersMutationOptions = Apollo.BaseMutationOptions<UpdateChaptersMutation, UpdateChaptersMutationVariables>;
export const AnalyticsDocument = gql`
    query Analytics {
  analytics {
    id
    bookId
    date
    read
    comment
    review
  }
}
    `;

/**
 * __useAnalyticsQuery__
 *
 * To run a query within a React component, call `useAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, options);
      }
export function useAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, options);
        }
export function useAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AnalyticsQuery, AnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AnalyticsQuery, AnalyticsQueryVariables>(AnalyticsDocument, options);
        }
export type AnalyticsQueryHookResult = ReturnType<typeof useAnalyticsQuery>;
export type AnalyticsLazyQueryHookResult = ReturnType<typeof useAnalyticsLazyQuery>;
export type AnalyticsSuspenseQueryHookResult = ReturnType<typeof useAnalyticsSuspenseQuery>;
export type AnalyticsQueryResult = Apollo.QueryResult<AnalyticsQuery, AnalyticsQueryVariables>;
export const BookOptionsDocument = gql`
    query BookOptions {
  kinds
  genders
  status
  genres {
    id
    name
  }
  tags {
    id
    name
    groupId
    group {
      id
      name
      color
      bgColor
    }
  }
}
    `;

/**
 * __useBookOptionsQuery__
 *
 * To run a query within a React component, call `useBookOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookOptionsQuery(baseOptions?: Apollo.QueryHookOptions<BookOptionsQuery, BookOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookOptionsQuery, BookOptionsQueryVariables>(BookOptionsDocument, options);
      }
export function useBookOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookOptionsQuery, BookOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookOptionsQuery, BookOptionsQueryVariables>(BookOptionsDocument, options);
        }
export function useBookOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookOptionsQuery, BookOptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookOptionsQuery, BookOptionsQueryVariables>(BookOptionsDocument, options);
        }
export type BookOptionsQueryHookResult = ReturnType<typeof useBookOptionsQuery>;
export type BookOptionsLazyQueryHookResult = ReturnType<typeof useBookOptionsLazyQuery>;
export type BookOptionsSuspenseQueryHookResult = ReturnType<typeof useBookOptionsSuspenseQuery>;
export type BookOptionsQueryResult = Apollo.QueryResult<BookOptionsQuery, BookOptionsQueryVariables>;
export const BookDocument = gql`
    query Book($bookId: Int!) {
  book(bookId: $bookId) {
    ...book
  }
}
    ${BookFragmentDoc}`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useBookQuery(baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables> & ({ variables: BookQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export function useBookSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookSuspenseQueryHookResult = ReturnType<typeof useBookSuspenseQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const CreatedBooksDocument = gql`
    query CreatedBooks($page: Int, $take: Int, $keyword: String!, $genreId: Int, $tagIds: [Int!], $sortBy: String, $sortOrder: SortOrder) {
  createdBooks(
    page: $page
    take: $take
    keyword: $keyword
    genreId: $genreId
    tagIds: $tagIds
    sortBy: $sortBy
    sortOrder: $sortOrder
  ) {
    total
    books {
      ...book
    }
  }
}
    ${BookFragmentDoc}`;

/**
 * __useCreatedBooksQuery__
 *
 * To run a query within a React component, call `useCreatedBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreatedBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreatedBooksQuery({
 *   variables: {
 *      page: // value for 'page'
 *      take: // value for 'take'
 *      keyword: // value for 'keyword'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useCreatedBooksQuery(baseOptions: Apollo.QueryHookOptions<CreatedBooksQuery, CreatedBooksQueryVariables> & ({ variables: CreatedBooksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreatedBooksQuery, CreatedBooksQueryVariables>(CreatedBooksDocument, options);
      }
export function useCreatedBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreatedBooksQuery, CreatedBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreatedBooksQuery, CreatedBooksQueryVariables>(CreatedBooksDocument, options);
        }
export function useCreatedBooksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CreatedBooksQuery, CreatedBooksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CreatedBooksQuery, CreatedBooksQueryVariables>(CreatedBooksDocument, options);
        }
export type CreatedBooksQueryHookResult = ReturnType<typeof useCreatedBooksQuery>;
export type CreatedBooksLazyQueryHookResult = ReturnType<typeof useCreatedBooksLazyQuery>;
export type CreatedBooksSuspenseQueryHookResult = ReturnType<typeof useCreatedBooksSuspenseQuery>;
export type CreatedBooksQueryResult = Apollo.QueryResult<CreatedBooksQuery, CreatedBooksQueryVariables>;
export const ChapterDocument = gql`
    query Chapter($chapterId: Int!) {
  chapter(chapterId: $chapterId) {
    ...chapter
    content
  }
}
    ${ChapterFragmentDoc}`;

/**
 * __useChapterQuery__
 *
 * To run a query within a React component, call `useChapterQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterQuery({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useChapterQuery(baseOptions: Apollo.QueryHookOptions<ChapterQuery, ChapterQueryVariables> & ({ variables: ChapterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, options);
      }
export function useChapterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, options);
        }
export function useChapterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, options);
        }
export type ChapterQueryHookResult = ReturnType<typeof useChapterQuery>;
export type ChapterLazyQueryHookResult = ReturnType<typeof useChapterLazyQuery>;
export type ChapterSuspenseQueryHookResult = ReturnType<typeof useChapterSuspenseQuery>;
export type ChapterQueryResult = Apollo.QueryResult<ChapterQuery, ChapterQueryVariables>;
export const ChaptersDocument = gql`
    query Chapters($bookId: Int!) {
  chapters(bookId: $bookId) {
    ...chapter
  }
}
    ${ChapterFragmentDoc}`;

/**
 * __useChaptersQuery__
 *
 * To run a query within a React component, call `useChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChaptersQuery({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useChaptersQuery(baseOptions: Apollo.QueryHookOptions<ChaptersQuery, ChaptersQueryVariables> & ({ variables: ChaptersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, options);
      }
export function useChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, options);
        }
export function useChaptersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, options);
        }
export type ChaptersQueryHookResult = ReturnType<typeof useChaptersQuery>;
export type ChaptersLazyQueryHookResult = ReturnType<typeof useChaptersLazyQuery>;
export type ChaptersSuspenseQueryHookResult = ReturnType<typeof useChaptersSuspenseQuery>;
export type ChaptersQueryResult = Apollo.QueryResult<ChaptersQuery, ChaptersQueryVariables>;
export const FullDocument = gql`
    query Full {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useFullQuery__
 *
 * To run a query within a React component, call `useFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullQuery({
 *   variables: {
 *   },
 * });
 */
export function useFullQuery(baseOptions?: Apollo.QueryHookOptions<FullQuery, FullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullQuery, FullQueryVariables>(FullDocument, options);
      }
export function useFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullQuery, FullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullQuery, FullQueryVariables>(FullDocument, options);
        }
export function useFullSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FullQuery, FullQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FullQuery, FullQueryVariables>(FullDocument, options);
        }
export type FullQueryHookResult = ReturnType<typeof useFullQuery>;
export type FullLazyQueryHookResult = ReturnType<typeof useFullLazyQuery>;
export type FullSuspenseQueryHookResult = ReturnType<typeof useFullSuspenseQuery>;
export type FullQueryResult = Apollo.QueryResult<FullQuery, FullQueryVariables>;