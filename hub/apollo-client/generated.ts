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

export type Chapter = {
  __typename?: 'Chapter';
  bookId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  publishAt: Scalars['Timestamp']['output'];
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
  convertBook: BookResponse;
  createBook: BookResponse;
  createChapter: ChapterMutationResponse;
  googleLogin: LoginResponse;
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  newPassword: MutationResponse;
  passwordReset: MutationResponse;
  refreshToken?: Maybe<Scalars['String']['output']>;
  register: MutationResponse;
  resendTwoFactorCode: MutationResponse;
  updateBook: BookResponse;
  updateConvertBook: BookResponse;
  updateCopyright?: Maybe<Scalars['Boolean']['output']>;
  updateNotificationSettings: NotificationSettings;
  updatePrivacyPolicy?: Maybe<Scalars['Boolean']['output']>;
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


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResendTwoFactorCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateBookArgs = {
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  status: Scalars['Int']['input'];
  synopsis: Scalars['String']['input'];
  tagIds: Array<Scalars['Int']['input']>;
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


export type MutationUpdateNotificationSettingsArgs = {
  newChapter: Scalars['Boolean']['input'];
  newInteraction: Scalars['Boolean']['input'];
};


export type MutationUpdatePrivacyPolicyArgs = {
  value: Scalars['String']['input'];
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
  total: Scalars['Int']['output'];
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
  book?: Maybe<Book>;
  books: Array<Book>;
  chapter?: Maybe<Chapter>;
  chapters: Array<Chapter>;
  copyright?: Maybe<Scalars['String']['output']>;
  createdBooks: PaginatedBooksResponse;
  genders: Array<Scalars['Int']['output']>;
  genres: Array<Genre>;
  kinds: Array<Scalars['Int']['output']>;
  me?: Maybe<User>;
  notificationSettings: NotificationSettings;
  privacyPolicy?: Maybe<Scalars['String']['output']>;
  reading: PaginatedReading;
  status: Array<Scalars['Int']['output']>;
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


export type QueryReadingArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  take: Scalars['Int']['input'];
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

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

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

export type ChapterFragment = { __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, content: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any };

export type UserFragment = { __typename?: 'User', id: number, email: string, nickname: string, avatar: string, pendant: string, role: UserRole, emailVerified?: any | null, isTwoFactorEnable: boolean, gender: number, introduce: string, phone: string, dob: any, urls: Array<string>, keyNum: number, ticketNum: number, candyNum: number, createdAt: any };

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
  name: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  genreId: Scalars['Int']['input'];
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  status: Scalars['Int']['input'];
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

export type CreateChapterMutationVariables = Exact<{
  bookId: Scalars['Int']['input'];
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  publishAt: Scalars['Timestamp']['input'];
  unlockPrice: Scalars['Int']['input'];
}>;


export type CreateChapterMutation = { __typename?: 'Mutation', createChapter: { __typename?: 'ChapterMutationResponse', success: boolean, message: string, chapter?: { __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, content: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any } | null } };

export type BookOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookOptionsQuery = { __typename?: 'Query', kinds: Array<number>, genders: Array<number>, status: Array<number>, genres: Array<{ __typename?: 'Genre', id: number, name: string }>, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', name: string, color: string, bgColor: string } }> };

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


export type ChapterQuery = { __typename?: 'Query', chapter?: { __typename?: 'Chapter', id: number, bookId: number, order: number, title: string, content: string, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any } | null };

export type ChaptersQueryVariables = Exact<{
  bookId: Scalars['Int']['input'];
}>;


export type ChaptersQuery = { __typename?: 'Query', chapters: Array<{ __typename?: 'Chapter', id: number, bookId: number, title: string, order: number, unlockPrice: number, publishAt: any, createdAt: any, updatedAt: any }> };

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
  content
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
    mutation UpdateBook($name: String!, $synopsis: String!, $gender: Int!, $genreId: Int!, $tagIds: [Int!]!, $id: Int!, $status: Int!) {
  updateBook(
    name: $name
    synopsis: $synopsis
    gender: $gender
    status: $status
    genreId: $genreId
    tagIds: $tagIds
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
 *      name: // value for 'name'
 *      synopsis: // value for 'synopsis'
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *      id: // value for 'id'
 *      status: // value for 'status'
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
    group {
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
    id
    bookId
    title
    order
    unlockPrice
    publishAt
    createdAt
    updatedAt
  }
}
    `;

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