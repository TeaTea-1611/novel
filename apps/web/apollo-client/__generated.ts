import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Timestamp: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type Author = {
  __typename?: "Author";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  originalName: Scalars["String"]["output"];
};

export type Book = {
  __typename?: "Book";
  author?: Maybe<Author>;
  authorId?: Maybe<Scalars["Int"]["output"]>;
  chapterCnt: Scalars["Int"]["output"];
  commentCnt: Scalars["Int"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  createdBy: User;
  createdById: Scalars["Int"]["output"];
  flowerCnt: Scalars["Int"]["output"];
  gender: Scalars["Int"]["output"];
  genre: Genre;
  genreId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  kind: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  newChapterAt: Scalars["Timestamp"]["output"];
  nominateMonthly?: Maybe<Scalars["Int"]["output"]>;
  originalLink: Scalars["String"]["output"];
  originalName: Scalars["String"]["output"];
  points: Scalars["Float"]["output"];
  poster: Scalars["String"]["output"];
  readCnt: Scalars["Int"]["output"];
  readMonthly?: Maybe<Scalars["Int"]["output"]>;
  reviewCnt: Scalars["Int"]["output"];
  status: Scalars["Int"]["output"];
  synopsis: Scalars["String"]["output"];
  tags: Array<Tag>;
  wordCnt: Scalars["Int"]["output"];
};

export type BookResponse = IMutationResponse & {
  __typename?: "BookResponse";
  book?: Maybe<Book>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type Chapter = {
  __typename?: "Chapter";
  book?: Maybe<Book>;
  bookId: Scalars["Int"]["output"];
  content: Scalars["String"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  id: Scalars["Int"]["output"];
  order: Scalars["Int"]["output"];
  publishAt: Scalars["Timestamp"]["output"];
  readCnt: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  unlockPrice: Scalars["Int"]["output"];
  updatedAt: Scalars["Timestamp"]["output"];
};

export type ChapterMutationResponse = IMutationResponse & {
  __typename?: "ChapterMutationResponse";
  chapter?: Maybe<Chapter>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type Genre = {
  __typename?: "Genre";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type IMutationResponse = {
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type LoginResponse = IMutationResponse & {
  __typename?: "LoginResponse";
  accessToken?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
  twoFactor?: Maybe<Scalars["Boolean"]["output"]>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  changeAvatar: User;
  changeAvatarCover: User;
  changePoster: Book;
  changeProfile: User;
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
  logout: Scalars["Boolean"]["output"];
  newPassword: MutationResponse;
  passwordReset: MutationResponse;
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  register: MutationResponse;
  resendTwoFactorCode: MutationResponse;
  swapChapters: Array<Chapter>;
  updateBook: BookResponse;
  updateChapter: ChapterMutationResponse;
  updateChapters: MutationResponse;
  updateConvertBook: BookResponse;
  updateCopyright?: Maybe<Scalars["Boolean"]["output"]>;
  updateGenre: Genre;
  updateNotificationSettings: NotificationSettings;
  updatePrivacyPolicy?: Maybe<Scalars["Boolean"]["output"]>;
  updateTag: Tag;
  updateTagGroup: TagGroup;
  updateTermsOfService?: Maybe<Scalars["Boolean"]["output"]>;
  updateTwoFactor: TwoFactorResponse;
  verification: MutationResponse;
};

export type MutationChangeAvatarArgs = {
  avatar: Scalars["Upload"]["input"];
};

export type MutationChangeAvatarCoverArgs = {
  avatarCover: Scalars["Upload"]["input"];
};

export type MutationChangePosterArgs = {
  bookId: Scalars["Int"]["input"];
  poster: Scalars["Upload"]["input"];
};

export type MutationChangeProfileArgs = {
  dob: Scalars["Timestamp"]["input"];
  gender: Scalars["Int"]["input"];
  introduce: Scalars["String"]["input"];
  nickname: Scalars["String"]["input"];
  urls: Array<Scalars["String"]["input"]>;
};

export type MutationConvertBookArgs = {
  authorName: Scalars["String"]["input"];
  gender: Scalars["Int"]["input"];
  genreId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  originalAuthorName: Scalars["String"]["input"];
  originalName: Scalars["String"]["input"];
  synopsis: Scalars["String"]["input"];
  tagIds: Array<Scalars["Int"]["input"]>;
};

export type MutationCreateBookArgs = {
  gender: Scalars["Int"]["input"];
  genreId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  synopsis: Scalars["String"]["input"];
  tagIds: Array<Scalars["Int"]["input"]>;
};

export type MutationCreateChapterArgs = {
  bookId: Scalars["Int"]["input"];
  content: Scalars["String"]["input"];
  order: Scalars["Int"]["input"];
  publishAt: Scalars["Timestamp"]["input"];
  title: Scalars["String"]["input"];
  unlockPrice: Scalars["Int"]["input"];
};

export type MutationCreateGenreArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateTagArgs = {
  groupId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationCreateTagGroupArgs = {
  color: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationDeleteBookArgs = {
  bookId: Scalars["Int"]["input"];
};

export type MutationDeleteChaptersArgs = {
  bookId: Scalars["Int"]["input"];
  chapterIds: Array<Scalars["Int"]["input"]>;
};

export type MutationDeleteGenresArgs = {
  genreIds: Array<Scalars["Int"]["input"]>;
};

export type MutationDeleteTagGroupsArgs = {
  tagGroupIds: Array<Scalars["Int"]["input"]>;
};

export type MutationDeleteTagsArgs = {
  tagIds: Array<Scalars["Int"]["input"]>;
};

export type MutationGoogleLoginArgs = {
  code: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationNewPasswordArgs = {
  newPassword: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type MutationPasswordResetArgs = {
  email: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"]["input"];
  nickname: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationResendTwoFactorCodeArgs = {
  email: Scalars["String"]["input"];
};

export type MutationSwapChaptersArgs = {
  bookId: Scalars["Int"]["input"];
  data: Array<SwapChapterInput>;
};

export type MutationUpdateBookArgs = {
  bookId: Scalars["Int"]["input"];
  gender?: InputMaybe<Scalars["Int"]["input"]>;
  genreId?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["Int"]["input"]>;
  synopsis?: InputMaybe<Scalars["String"]["input"]>;
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type MutationUpdateChapterArgs = {
  bookId: Scalars["Int"]["input"];
  chapterId: Scalars["Int"]["input"];
  content: Scalars["String"]["input"];
  publishAt: Scalars["Timestamp"]["input"];
  title: Scalars["String"]["input"];
  unlockPrice: Scalars["Int"]["input"];
};

export type MutationUpdateChaptersArgs = {
  bookId: Scalars["Int"]["input"];
  chapterIds: Array<Scalars["Int"]["input"]>;
  publishAt: Scalars["Timestamp"]["input"];
  unlockPrice: Scalars["Int"]["input"];
};

export type MutationUpdateConvertBookArgs = {
  authorName: Scalars["String"]["input"];
  gender: Scalars["Int"]["input"];
  genreId: Scalars["Int"]["input"];
  id: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  originalAuthorName: Scalars["String"]["input"];
  originalName: Scalars["String"]["input"];
  synopsis: Scalars["String"]["input"];
  tagIds: Array<Scalars["Int"]["input"]>;
};

export type MutationUpdateCopyrightArgs = {
  value: Scalars["String"]["input"];
};

export type MutationUpdateGenreArgs = {
  genreId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationUpdateNotificationSettingsArgs = {
  newChapter: Scalars["Boolean"]["input"];
  newInteraction: Scalars["Boolean"]["input"];
};

export type MutationUpdatePrivacyPolicyArgs = {
  value: Scalars["String"]["input"];
};

export type MutationUpdateTagArgs = {
  groupId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  tagId: Scalars["Int"]["input"];
};

export type MutationUpdateTagGroupArgs = {
  color: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  tagGroupId: Scalars["Int"]["input"];
};

export type MutationUpdateTermsOfServiceArgs = {
  value: Scalars["String"]["input"];
};

export type MutationUpdateTwoFactorArgs = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  isTwoFactorEnable: Scalars["Boolean"]["input"];
};

export type MutationVerificationArgs = {
  token: Scalars["String"]["input"];
};

export type MutationResponse = IMutationResponse & {
  __typename?: "MutationResponse";
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type NotificationSettings = {
  __typename?: "NotificationSettings";
  newChapter: Scalars["Boolean"]["output"];
  newInteraction: Scalars["Boolean"]["output"];
  userId: Scalars["Int"]["output"];
};

export type PaginatedBooksResponse = {
  __typename?: "PaginatedBooksResponse";
  books: Array<Book>;
  next?: Maybe<Scalars["Int"]["output"]>;
  prev?: Maybe<Scalars["Int"]["output"]>;
  total: Scalars["Int"]["output"];
  totalPages: Scalars["Int"]["output"];
};

export enum PaginatedRankingType {
  Comment = "comment",
  Flower = "flower",
  Nominate = "nominate",
  Read = "read",
  Review = "review",
}

export type Query = {
  __typename?: "Query";
  book?: Maybe<Book>;
  chapterByBookAndOrder?: Maybe<Chapter>;
  chapterById?: Maybe<Chapter>;
  chapters: Array<Chapter>;
  copyright?: Maybe<Scalars["String"]["output"]>;
  createdBooks: PaginatedBooksResponse;
  genders: Array<Scalars["Int"]["output"]>;
  genres: Array<Genre>;
  kinds: Array<Scalars["Int"]["output"]>;
  me?: Maybe<User>;
  paginatedBooks: PaginatedBooksResponse;
  paginatedRankingBooks: PaginatedBooksResponse;
  privacyPolicy?: Maybe<Scalars["String"]["output"]>;
  status: Array<Scalars["Int"]["output"]>;
  tagGroups: Array<TagGroup>;
  tags: Array<Tag>;
  termsOfService?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export type QueryBookArgs = {
  bookId: Scalars["Int"]["input"];
};

export type QueryChapterByBookAndOrderArgs = {
  bookId: Scalars["Int"]["input"];
  order: Scalars["Int"]["input"];
};

export type QueryChapterByIdArgs = {
  chapterId: Scalars["Int"]["input"];
};

export type QueryChaptersArgs = {
  bookId: Scalars["Int"]["input"];
};

export type QueryCreatedBooksArgs = {
  gender?: InputMaybe<Scalars["Int"]["input"]>;
  genreId?: InputMaybe<Scalars["Int"]["input"]>;
  keyword?: Scalars["String"]["input"];
  page?: Scalars["Int"]["input"];
  sortBy?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<SortOrder>;
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  take?: Scalars["Int"]["input"];
};

export type QueryPaginatedBooksArgs = {
  gender?: InputMaybe<Scalars["Int"]["input"]>;
  genreId?: InputMaybe<Scalars["Int"]["input"]>;
  keyword?: Scalars["String"]["input"];
  page?: Scalars["Int"]["input"];
  sortBy?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<SortOrder>;
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  take?: Scalars["Int"]["input"];
};

export type QueryPaginatedRankingBooksArgs = {
  month: Scalars["Int"]["input"];
  page: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  type: PaginatedRankingType;
  year: Scalars["Int"]["input"];
};

export type QueryUserArgs = {
  userId: Scalars["Int"]["input"];
};

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type SwapChapterInput = {
  id: Scalars["Int"]["input"];
  newOrder: Scalars["Int"]["input"];
};

export type Tag = {
  __typename?: "Tag";
  group: TagGroup;
  groupId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type TagGroup = {
  __typename?: "TagGroup";
  color: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type TwoFactorResponse = IMutationResponse & {
  __typename?: "TwoFactorResponse";
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
  twoFactor?: Maybe<Scalars["Boolean"]["output"]>;
};

export type User = {
  __typename?: "User";
  avatar: Scalars["String"]["output"];
  avatarCover: Scalars["String"]["output"];
  candyNum: Scalars["Int"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  dob: Scalars["Timestamp"]["output"];
  email: Scalars["String"]["output"];
  emailVerified?: Maybe<Scalars["Timestamp"]["output"]>;
  gender: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  introduce: Scalars["String"]["output"];
  isTwoFactorEnable: Scalars["Boolean"]["output"];
  keyNum: Scalars["Int"]["output"];
  nickname: Scalars["String"]["output"];
  notificationSettings: NotificationSettings;
  phone: Scalars["String"]["output"];
  role: UserRole;
  ticketNum: Scalars["Int"]["output"];
  urls: Array<Scalars["String"]["output"]>;
};

export enum UserRole {
  Admin = "ADMIN",
  Converter = "CONVERTER",
  Editor = "EDITOR",
  User = "USER",
}

export type BookFragment = {
  __typename?: "Book";
  id: number;
  name: string;
  originalName: string;
  synopsis: string;
  poster: string;
  kind: number;
  gender: number;
  status: number;
  wordCnt: number;
  flowerCnt: number;
  readCnt: number;
  reviewCnt: number;
  chapterCnt: number;
  commentCnt: number;
  points: number;
  createdAt: any;
  newChapterAt: any;
  author?: {
    __typename?: "Author";
    id: number;
    name: string;
    originalName: string;
  } | null;
  createdBy: {
    __typename?: "User";
    id: number;
    nickname: string;
    avatar: string;
    avatarCover: string;
  };
  tags: Array<{
    __typename?: "Tag";
    id: number;
    name: string;
    group: { __typename?: "TagGroup"; name: string; color: string };
  }>;
  genre: { __typename?: "Genre"; id: number; name: string };
};

export type ChapterFragment = {
  __typename?: "Chapter";
  id: number;
  bookId: number;
  order: number;
  title: string;
  unlockPrice: number;
  publishAt: any;
  createdAt: any;
  updatedAt: any;
};

export type TagFragment = {
  __typename?: "Tag";
  id: number;
  name: string;
  group: { __typename?: "TagGroup"; name: string; color: string };
};

export type UserFragment = {
  __typename?: "User";
  id: number;
  email: string;
  nickname: string;
  avatar: string;
  avatarCover: string;
  role: UserRole;
  emailVerified?: any | null;
  isTwoFactorEnable: boolean;
  gender: number;
  introduce: string;
  phone: string;
  dob: any;
  urls: Array<string>;
  keyNum: number;
  ticketNum: number;
  candyNum: number;
  createdAt: any;
};

export type RegisterMutationVariables = Exact<{
  nickname: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "MutationResponse";
    success: boolean;
    message: string;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  code?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    success: boolean;
    message: string;
    accessToken?: string | null;
    twoFactor?: boolean | null;
  };
};

export type GoogleLoginMutationVariables = Exact<{
  code: Scalars["String"]["input"];
}>;

export type GoogleLoginMutation = {
  __typename?: "Mutation";
  googleLogin: {
    __typename?: "LoginResponse";
    success: boolean;
    message: string;
    accessToken?: string | null;
    twoFactor?: boolean | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken?: string | null;
};

export type VerificationMutationVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type VerificationMutation = {
  __typename?: "Mutation";
  verification: {
    __typename?: "MutationResponse";
    success: boolean;
    message: string;
  };
};

export type PasswordResetMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type PasswordResetMutation = {
  __typename?: "Mutation";
  passwordReset: {
    __typename?: "MutationResponse";
    success: boolean;
    message: string;
  };
};

export type NewPasswordMutationVariables = Exact<{
  token: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
}>;

export type NewPasswordMutation = {
  __typename?: "Mutation";
  newPassword: {
    __typename?: "MutationResponse";
    success: boolean;
    message: string;
  };
};

export type UpdateTwoFactorMutationVariables = Exact<{
  isTwoFactorEnable: Scalars["Boolean"]["input"];
  code?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateTwoFactorMutation = {
  __typename?: "Mutation";
  updateTwoFactor: {
    __typename?: "TwoFactorResponse";
    success: boolean;
    message: string;
    twoFactor?: boolean | null;
  };
};

export type ResendTwoFactorCodeMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ResendTwoFactorCodeMutation = {
  __typename?: "Mutation";
  resendTwoFactorCode: {
    __typename?: "MutationResponse";
    success: boolean;
    message: string;
  };
};

export type CreateBookMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  synopsis: Scalars["String"]["input"];
  gender: Scalars["Int"]["input"];
  genreId: Scalars["Int"]["input"];
  tagIds: Array<Scalars["Int"]["input"]> | Scalars["Int"]["input"];
}>;

export type CreateBookMutation = {
  __typename?: "Mutation";
  createBook: {
    __typename?: "BookResponse";
    success: boolean;
    message: string;
    book?: {
      __typename?: "Book";
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    } | null;
  };
};

export type UpdateBookMutationVariables = Exact<{
  bookId: Scalars["Int"]["input"];
  status?: InputMaybe<Scalars["Int"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  synopsis?: InputMaybe<Scalars["String"]["input"]>;
  gender?: InputMaybe<Scalars["Int"]["input"]>;
  genreId?: InputMaybe<Scalars["Int"]["input"]>;
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]> | Scalars["Int"]["input"]>;
}>;

export type UpdateBookMutation = {
  __typename?: "Mutation";
  updateBook: {
    __typename?: "BookResponse";
    success: boolean;
    message: string;
    book?: {
      __typename?: "Book";
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    } | null;
  };
};

export type ChangePosterMutationVariables = Exact<{
  poster: Scalars["Upload"]["input"];
  bookId: Scalars["Int"]["input"];
}>;

export type ChangePosterMutation = {
  __typename?: "Mutation";
  changePoster: {
    __typename?: "Book";
    id: number;
    name: string;
    originalName: string;
    synopsis: string;
    poster: string;
    kind: number;
    gender: number;
    status: number;
    wordCnt: number;
    flowerCnt: number;
    readCnt: number;
    reviewCnt: number;
    chapterCnt: number;
    commentCnt: number;
    points: number;
    createdAt: any;
    newChapterAt: any;
    author?: {
      __typename?: "Author";
      id: number;
      name: string;
      originalName: string;
    } | null;
    createdBy: {
      __typename?: "User";
      id: number;
      nickname: string;
      avatar: string;
      avatarCover: string;
    };
    tags: Array<{
      __typename?: "Tag";
      id: number;
      name: string;
      group: { __typename?: "TagGroup"; name: string; color: string };
    }>;
    genre: { __typename?: "Genre"; id: number; name: string };
  };
};

export type DeleteBookMutationVariables = Exact<{
  bookId: Scalars["Int"]["input"];
}>;

export type DeleteBookMutation = {
  __typename?: "Mutation";
  deleteBook: {
    __typename?: "MutationResponse";
    success: boolean;
    message: string;
  };
};

export type ChangeProfileMutationVariables = Exact<{
  nickname: Scalars["String"]["input"];
  introduce: Scalars["String"]["input"];
  urls: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
  gender: Scalars["Int"]["input"];
  dob: Scalars["Timestamp"]["input"];
}>;

export type ChangeProfileMutation = {
  __typename?: "Mutation";
  changeProfile: {
    __typename?: "User";
    id: number;
    email: string;
    nickname: string;
    avatar: string;
    avatarCover: string;
    role: UserRole;
    emailVerified?: any | null;
    isTwoFactorEnable: boolean;
    gender: number;
    introduce: string;
    phone: string;
    dob: any;
    urls: Array<string>;
    keyNum: number;
    ticketNum: number;
    candyNum: number;
    createdAt: any;
  };
};

export type ChangeAvatarMutationVariables = Exact<{
  avatar: Scalars["Upload"]["input"];
}>;

export type ChangeAvatarMutation = {
  __typename?: "Mutation";
  changeAvatar: {
    __typename?: "User";
    id: number;
    email: string;
    nickname: string;
    avatar: string;
    avatarCover: string;
    role: UserRole;
    emailVerified?: any | null;
    isTwoFactorEnable: boolean;
    gender: number;
    introduce: string;
    phone: string;
    dob: any;
    urls: Array<string>;
    keyNum: number;
    ticketNum: number;
    candyNum: number;
    createdAt: any;
  };
};

export type ChangeAvatarCoverMutationVariables = Exact<{
  avatarCover: Scalars["Upload"]["input"];
}>;

export type ChangeAvatarCoverMutation = {
  __typename?: "Mutation";
  changeAvatarCover: {
    __typename?: "User";
    id: number;
    email: string;
    nickname: string;
    avatar: string;
    avatarCover: string;
    role: UserRole;
    emailVerified?: any | null;
    isTwoFactorEnable: boolean;
    gender: number;
    introduce: string;
    phone: string;
    dob: any;
    urls: Array<string>;
    keyNum: number;
    ticketNum: number;
    candyNum: number;
    createdAt: any;
  };
};

export type UpdateNotificationSettingsMutationVariables = Exact<{
  newChapter: Scalars["Boolean"]["input"];
  newInteraction: Scalars["Boolean"]["input"];
}>;

export type UpdateNotificationSettingsMutation = {
  __typename?: "Mutation";
  updateNotificationSettings: {
    __typename?: "NotificationSettings";
    newChapter: boolean;
    newInteraction: boolean;
  };
};

export type BookOptionsQueryVariables = Exact<{ [key: string]: never }>;

export type BookOptionsQuery = {
  __typename?: "Query";
  kinds: Array<number>;
  genders: Array<number>;
  status: Array<number>;
  genres: Array<{ __typename?: "Genre"; id: number; name: string }>;
  tags: Array<{
    __typename?: "Tag";
    id: number;
    name: string;
    group: { __typename?: "TagGroup"; name: string; color: string };
  }>;
};

export type BookQueryVariables = Exact<{
  bookId: Scalars["Int"]["input"];
}>;

export type BookQuery = {
  __typename?: "Query";
  book?: {
    __typename?: "Book";
    id: number;
    name: string;
    originalName: string;
    synopsis: string;
    poster: string;
    kind: number;
    gender: number;
    status: number;
    wordCnt: number;
    flowerCnt: number;
    readCnt: number;
    reviewCnt: number;
    chapterCnt: number;
    commentCnt: number;
    points: number;
    createdAt: any;
    newChapterAt: any;
    author?: {
      __typename?: "Author";
      id: number;
      name: string;
      originalName: string;
    } | null;
    createdBy: {
      __typename?: "User";
      id: number;
      nickname: string;
      avatar: string;
      avatarCover: string;
    };
    tags: Array<{
      __typename?: "Tag";
      id: number;
      name: string;
      group: { __typename?: "TagGroup"; name: string; color: string };
    }>;
    genre: { __typename?: "Genre"; id: number; name: string };
  } | null;
};

export type HomePageDataQueryVariables = Exact<{
  month: Scalars["Int"]["input"];
  year: Scalars["Int"]["input"];
}>;

export type HomePageDataQuery = {
  __typename?: "Query";
  editorPicks: {
    __typename?: "PaginatedBooksResponse";
    books: Array<{
      __typename?: "Book";
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    }>;
  };
  recentUpdates: {
    __typename?: "PaginatedBooksResponse";
    books: Array<{
      __typename?: "Book";
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    }>;
  };
  mostReadBooks: {
    __typename?: "PaginatedBooksResponse";
    books: Array<{
      __typename?: "Book";
      readMonthly?: number | null;
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    }>;
  };
  topNominations: {
    __typename?: "PaginatedBooksResponse";
    books: Array<{
      __typename?: "Book";
      nominateMonthly?: number | null;
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    }>;
  };
};

export type CreatedBooksQueryVariables = Exact<{
  page: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  keyword: Scalars["String"]["input"];
  gender?: InputMaybe<Scalars["Int"]["input"]>;
  genreId?: InputMaybe<Scalars["Int"]["input"]>;
  tagIds?: InputMaybe<Array<Scalars["Int"]["input"]> | Scalars["Int"]["input"]>;
  sortBy?: InputMaybe<Scalars["String"]["input"]>;
  sortOrder?: InputMaybe<SortOrder>;
}>;

export type CreatedBooksQuery = {
  __typename?: "Query";
  createdBooks: {
    __typename?: "PaginatedBooksResponse";
    total: number;
    prev?: number | null;
    next?: number | null;
    totalPages: number;
    books: Array<{
      __typename?: "Book";
      id: number;
      name: string;
      originalName: string;
      synopsis: string;
      poster: string;
      kind: number;
      gender: number;
      status: number;
      wordCnt: number;
      flowerCnt: number;
      readCnt: number;
      reviewCnt: number;
      chapterCnt: number;
      commentCnt: number;
      points: number;
      createdAt: any;
      newChapterAt: any;
      author?: {
        __typename?: "Author";
        id: number;
        name: string;
        originalName: string;
      } | null;
      createdBy: {
        __typename?: "User";
        id: number;
        nickname: string;
        avatar: string;
        avatarCover: string;
      };
      tags: Array<{
        __typename?: "Tag";
        id: number;
        name: string;
        group: { __typename?: "TagGroup"; name: string; color: string };
      }>;
      genre: { __typename?: "Genre"; id: number; name: string };
    }>;
  };
};

export type ChapterByBookAndOrderQueryVariables = Exact<{
  order: Scalars["Int"]["input"];
  bookId: Scalars["Int"]["input"];
}>;

export type ChapterByBookAndOrderQuery = {
  __typename?: "Query";
  chapterByBookAndOrder?: {
    __typename?: "Chapter";
    content: string;
    id: number;
    bookId: number;
    order: number;
    title: string;
    unlockPrice: number;
    publishAt: any;
    createdAt: any;
    updatedAt: any;
    book?: { __typename?: "Book"; name: string } | null;
  } | null;
};

export type ChaptersQueryVariables = Exact<{
  bookId: Scalars["Int"]["input"];
}>;

export type ChaptersQuery = {
  __typename?: "Query";
  chapters: Array<{
    __typename?: "Chapter";
    id: number;
    bookId: number;
    order: number;
    title: string;
    unlockPrice: number;
    publishAt: any;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type FullQueryVariables = Exact<{ [key: string]: never }>;

export type FullQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: number;
    email: string;
    nickname: string;
    avatar: string;
    avatarCover: string;
    role: UserRole;
    emailVerified?: any | null;
    isTwoFactorEnable: boolean;
    gender: number;
    introduce: string;
    phone: string;
    dob: any;
    urls: Array<string>;
    keyNum: number;
    ticketNum: number;
    candyNum: number;
    createdAt: any;
  } | null;
};

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
      avatarCover
    }
    tags {
      id
      name
      group {
        name
        color
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
export const TagFragmentDoc = gql`
  fragment tag on Tag {
    id
    name
    group {
      name
      color
    }
  }
`;
export const UserFragmentDoc = gql`
  fragment user on User {
    id
    email
    nickname
    avatar
    avatarCover
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
export const RegisterDocument = gql`
  mutation Register($nickname: String!, $email: String!, $password: String!) {
    register(nickname: $nickname, email: $email, password: $password) {
      success
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      nickname: // value for 'nickname'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!, $code: String) {
    login(email: $email, password: $password, code: $code) {
      success
      message
      accessToken
      twoFactor
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const GoogleLoginDocument = gql`
  mutation GoogleLogin($code: String!) {
    googleLogin(code: $code) {
      success
      message
      accessToken
      twoFactor
    }
  }
`;
export type GoogleLoginMutationFn = Apollo.MutationFunction<
  GoogleLoginMutation,
  GoogleLoginMutationVariables
>;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogleLoginMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGoogleLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GoogleLoginMutation,
    GoogleLoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(
    GoogleLoginDocument,
    options,
  );
}
export type GoogleLoginMutationHookResult = ReturnType<
  typeof useGoogleLoginMutation
>;
export type GoogleLoginMutationResult =
  Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<
  GoogleLoginMutation,
  GoogleLoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

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
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const VerificationDocument = gql`
  mutation Verification($token: String!) {
    verification(token: $token) {
      success
      message
    }
  }
`;
export type VerificationMutationFn = Apollo.MutationFunction<
  VerificationMutation,
  VerificationMutationVariables
>;

/**
 * __useVerificationMutation__
 *
 * To run a mutation, you first call `useVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verificationMutation, { data, loading, error }] = useVerificationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerificationMutation,
    VerificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    VerificationMutation,
    VerificationMutationVariables
  >(VerificationDocument, options);
}
export type VerificationMutationHookResult = ReturnType<
  typeof useVerificationMutation
>;
export type VerificationMutationResult =
  Apollo.MutationResult<VerificationMutation>;
export type VerificationMutationOptions = Apollo.BaseMutationOptions<
  VerificationMutation,
  VerificationMutationVariables
>;
export const PasswordResetDocument = gql`
  mutation PasswordReset($email: String!) {
    passwordReset(email: $email) {
      success
      message
    }
  }
`;
export type PasswordResetMutationFn = Apollo.MutationFunction<
  PasswordResetMutation,
  PasswordResetMutationVariables
>;

/**
 * __usePasswordResetMutation__
 *
 * To run a mutation, you first call `usePasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordResetMutation, { data, loading, error }] = usePasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function usePasswordResetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PasswordResetMutation,
    PasswordResetMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PasswordResetMutation,
    PasswordResetMutationVariables
  >(PasswordResetDocument, options);
}
export type PasswordResetMutationHookResult = ReturnType<
  typeof usePasswordResetMutation
>;
export type PasswordResetMutationResult =
  Apollo.MutationResult<PasswordResetMutation>;
export type PasswordResetMutationOptions = Apollo.BaseMutationOptions<
  PasswordResetMutation,
  PasswordResetMutationVariables
>;
export const NewPasswordDocument = gql`
  mutation NewPassword($token: String!, $newPassword: String!) {
    newPassword(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;
export type NewPasswordMutationFn = Apollo.MutationFunction<
  NewPasswordMutation,
  NewPasswordMutationVariables
>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useNewPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    NewPasswordMutation,
    NewPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(
    NewPasswordDocument,
    options,
  );
}
export type NewPasswordMutationHookResult = ReturnType<
  typeof useNewPasswordMutation
>;
export type NewPasswordMutationResult =
  Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<
  NewPasswordMutation,
  NewPasswordMutationVariables
>;
export const UpdateTwoFactorDocument = gql`
  mutation UpdateTwoFactor($isTwoFactorEnable: Boolean!, $code: String) {
    updateTwoFactor(isTwoFactorEnable: $isTwoFactorEnable, code: $code) {
      success
      message
      twoFactor
    }
  }
`;
export type UpdateTwoFactorMutationFn = Apollo.MutationFunction<
  UpdateTwoFactorMutation,
  UpdateTwoFactorMutationVariables
>;

/**
 * __useUpdateTwoFactorMutation__
 *
 * To run a mutation, you first call `useUpdateTwoFactorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTwoFactorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTwoFactorMutation, { data, loading, error }] = useUpdateTwoFactorMutation({
 *   variables: {
 *      isTwoFactorEnable: // value for 'isTwoFactorEnable'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUpdateTwoFactorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTwoFactorMutation,
    UpdateTwoFactorMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTwoFactorMutation,
    UpdateTwoFactorMutationVariables
  >(UpdateTwoFactorDocument, options);
}
export type UpdateTwoFactorMutationHookResult = ReturnType<
  typeof useUpdateTwoFactorMutation
>;
export type UpdateTwoFactorMutationResult =
  Apollo.MutationResult<UpdateTwoFactorMutation>;
export type UpdateTwoFactorMutationOptions = Apollo.BaseMutationOptions<
  UpdateTwoFactorMutation,
  UpdateTwoFactorMutationVariables
>;
export const ResendTwoFactorCodeDocument = gql`
  mutation ResendTwoFactorCode($email: String!) {
    resendTwoFactorCode(email: $email) {
      success
      message
    }
  }
`;
export type ResendTwoFactorCodeMutationFn = Apollo.MutationFunction<
  ResendTwoFactorCodeMutation,
  ResendTwoFactorCodeMutationVariables
>;

/**
 * __useResendTwoFactorCodeMutation__
 *
 * To run a mutation, you first call `useResendTwoFactorCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendTwoFactorCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendTwoFactorCodeMutation, { data, loading, error }] = useResendTwoFactorCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendTwoFactorCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResendTwoFactorCodeMutation,
    ResendTwoFactorCodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResendTwoFactorCodeMutation,
    ResendTwoFactorCodeMutationVariables
  >(ResendTwoFactorCodeDocument, options);
}
export type ResendTwoFactorCodeMutationHookResult = ReturnType<
  typeof useResendTwoFactorCodeMutation
>;
export type ResendTwoFactorCodeMutationResult =
  Apollo.MutationResult<ResendTwoFactorCodeMutation>;
export type ResendTwoFactorCodeMutationOptions = Apollo.BaseMutationOptions<
  ResendTwoFactorCodeMutation,
  ResendTwoFactorCodeMutationVariables
>;
export const CreateBookDocument = gql`
  mutation CreateBook(
    $name: String!
    $synopsis: String!
    $gender: Int!
    $genreId: Int!
    $tagIds: [Int!]!
  ) {
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
  ${BookFragmentDoc}
`;
export type CreateBookMutationFn = Apollo.MutationFunction<
  CreateBookMutation,
  CreateBookMutationVariables
>;

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
export function useCreateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookMutation,
    CreateBookMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(
    CreateBookDocument,
    options,
  );
}
export type CreateBookMutationHookResult = ReturnType<
  typeof useCreateBookMutation
>;
export type CreateBookMutationResult =
  Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<
  CreateBookMutation,
  CreateBookMutationVariables
>;
export const UpdateBookDocument = gql`
  mutation UpdateBook(
    $bookId: Int!
    $status: Int
    $name: String
    $synopsis: String
    $gender: Int
    $genreId: Int
    $tagIds: [Int!]
  ) {
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
  ${BookFragmentDoc}
`;
export type UpdateBookMutationFn = Apollo.MutationFunction<
  UpdateBookMutation,
  UpdateBookMutationVariables
>;

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
export function useUpdateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBookMutation,
    UpdateBookMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(
    UpdateBookDocument,
    options,
  );
}
export type UpdateBookMutationHookResult = ReturnType<
  typeof useUpdateBookMutation
>;
export type UpdateBookMutationResult =
  Apollo.MutationResult<UpdateBookMutation>;
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<
  UpdateBookMutation,
  UpdateBookMutationVariables
>;
export const ChangePosterDocument = gql`
  mutation ChangePoster($poster: Upload!, $bookId: Int!) {
    changePoster(poster: $poster, bookId: $bookId) {
      ...book
    }
  }
  ${BookFragmentDoc}
`;
export type ChangePosterMutationFn = Apollo.MutationFunction<
  ChangePosterMutation,
  ChangePosterMutationVariables
>;

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
export function useChangePosterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePosterMutation,
    ChangePosterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePosterMutation,
    ChangePosterMutationVariables
  >(ChangePosterDocument, options);
}
export type ChangePosterMutationHookResult = ReturnType<
  typeof useChangePosterMutation
>;
export type ChangePosterMutationResult =
  Apollo.MutationResult<ChangePosterMutation>;
export type ChangePosterMutationOptions = Apollo.BaseMutationOptions<
  ChangePosterMutation,
  ChangePosterMutationVariables
>;
export const DeleteBookDocument = gql`
  mutation DeleteBook($bookId: Int!) {
    deleteBook(bookId: $bookId) {
      success
      message
    }
  }
`;
export type DeleteBookMutationFn = Apollo.MutationFunction<
  DeleteBookMutation,
  DeleteBookMutationVariables
>;

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
export function useDeleteBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBookMutation,
    DeleteBookMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(
    DeleteBookDocument,
    options,
  );
}
export type DeleteBookMutationHookResult = ReturnType<
  typeof useDeleteBookMutation
>;
export type DeleteBookMutationResult =
  Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<
  DeleteBookMutation,
  DeleteBookMutationVariables
>;
export const ChangeProfileDocument = gql`
  mutation ChangeProfile(
    $nickname: String!
    $introduce: String!
    $urls: [String!]!
    $gender: Int!
    $dob: Timestamp!
  ) {
    changeProfile(
      nickname: $nickname
      introduce: $introduce
      urls: $urls
      gender: $gender
      dob: $dob
    ) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;
export type ChangeProfileMutationFn = Apollo.MutationFunction<
  ChangeProfileMutation,
  ChangeProfileMutationVariables
>;

/**
 * __useChangeProfileMutation__
 *
 * To run a mutation, you first call `useChangeProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileMutation, { data, loading, error }] = useChangeProfileMutation({
 *   variables: {
 *      nickname: // value for 'nickname'
 *      introduce: // value for 'introduce'
 *      urls: // value for 'urls'
 *      gender: // value for 'gender'
 *      dob: // value for 'dob'
 *   },
 * });
 */
export function useChangeProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeProfileMutation,
    ChangeProfileMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeProfileMutation,
    ChangeProfileMutationVariables
  >(ChangeProfileDocument, options);
}
export type ChangeProfileMutationHookResult = ReturnType<
  typeof useChangeProfileMutation
>;
export type ChangeProfileMutationResult =
  Apollo.MutationResult<ChangeProfileMutation>;
export type ChangeProfileMutationOptions = Apollo.BaseMutationOptions<
  ChangeProfileMutation,
  ChangeProfileMutationVariables
>;
export const ChangeAvatarDocument = gql`
  mutation ChangeAvatar($avatar: Upload!) {
    changeAvatar(avatar: $avatar) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;
export type ChangeAvatarMutationFn = Apollo.MutationFunction<
  ChangeAvatarMutation,
  ChangeAvatarMutationVariables
>;

/**
 * __useChangeAvatarMutation__
 *
 * To run a mutation, you first call `useChangeAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAvatarMutation, { data, loading, error }] = useChangeAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useChangeAvatarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeAvatarMutation,
    ChangeAvatarMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeAvatarMutation,
    ChangeAvatarMutationVariables
  >(ChangeAvatarDocument, options);
}
export type ChangeAvatarMutationHookResult = ReturnType<
  typeof useChangeAvatarMutation
>;
export type ChangeAvatarMutationResult =
  Apollo.MutationResult<ChangeAvatarMutation>;
export type ChangeAvatarMutationOptions = Apollo.BaseMutationOptions<
  ChangeAvatarMutation,
  ChangeAvatarMutationVariables
>;
export const ChangeAvatarCoverDocument = gql`
  mutation ChangeAvatarCover($avatarCover: Upload!) {
    changeAvatarCover(avatarCover: $avatarCover) {
      ...user
    }
  }
  ${UserFragmentDoc}
`;
export type ChangeAvatarCoverMutationFn = Apollo.MutationFunction<
  ChangeAvatarCoverMutation,
  ChangeAvatarCoverMutationVariables
>;

/**
 * __useChangeAvatarCoverMutation__
 *
 * To run a mutation, you first call `useChangeAvatarCoverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAvatarCoverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAvatarCoverMutation, { data, loading, error }] = useChangeAvatarCoverMutation({
 *   variables: {
 *      avatarCover: // value for 'avatarCover'
 *   },
 * });
 */
export function useChangeAvatarCoverMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeAvatarCoverMutation,
    ChangeAvatarCoverMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeAvatarCoverMutation,
    ChangeAvatarCoverMutationVariables
  >(ChangeAvatarCoverDocument, options);
}
export type ChangeAvatarCoverMutationHookResult = ReturnType<
  typeof useChangeAvatarCoverMutation
>;
export type ChangeAvatarCoverMutationResult =
  Apollo.MutationResult<ChangeAvatarCoverMutation>;
export type ChangeAvatarCoverMutationOptions = Apollo.BaseMutationOptions<
  ChangeAvatarCoverMutation,
  ChangeAvatarCoverMutationVariables
>;
export const UpdateNotificationSettingsDocument = gql`
  mutation UpdateNotificationSettings(
    $newChapter: Boolean!
    $newInteraction: Boolean!
  ) {
    updateNotificationSettings(
      newChapter: $newChapter
      newInteraction: $newInteraction
    ) {
      newChapter
      newInteraction
    }
  }
`;
export type UpdateNotificationSettingsMutationFn = Apollo.MutationFunction<
  UpdateNotificationSettingsMutation,
  UpdateNotificationSettingsMutationVariables
>;

/**
 * __useUpdateNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationSettingsMutation, { data, loading, error }] = useUpdateNotificationSettingsMutation({
 *   variables: {
 *      newChapter: // value for 'newChapter'
 *      newInteraction: // value for 'newInteraction'
 *   },
 * });
 */
export function useUpdateNotificationSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNotificationSettingsMutation,
    UpdateNotificationSettingsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateNotificationSettingsMutation,
    UpdateNotificationSettingsMutationVariables
  >(UpdateNotificationSettingsDocument, options);
}
export type UpdateNotificationSettingsMutationHookResult = ReturnType<
  typeof useUpdateNotificationSettingsMutation
>;
export type UpdateNotificationSettingsMutationResult =
  Apollo.MutationResult<UpdateNotificationSettingsMutation>;
export type UpdateNotificationSettingsMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateNotificationSettingsMutation,
    UpdateNotificationSettingsMutationVariables
  >;
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
      ...tag
    }
  }
  ${TagFragmentDoc}
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
export function useBookOptionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BookOptionsQuery,
    BookOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookOptionsQuery, BookOptionsQueryVariables>(
    BookOptionsDocument,
    options,
  );
}
export function useBookOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BookOptionsQuery,
    BookOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookOptionsQuery, BookOptionsQueryVariables>(
    BookOptionsDocument,
    options,
  );
}
export function useBookOptionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        BookOptionsQuery,
        BookOptionsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<BookOptionsQuery, BookOptionsQueryVariables>(
    BookOptionsDocument,
    options,
  );
}
export type BookOptionsQueryHookResult = ReturnType<typeof useBookOptionsQuery>;
export type BookOptionsLazyQueryHookResult = ReturnType<
  typeof useBookOptionsLazyQuery
>;
export type BookOptionsSuspenseQueryHookResult = ReturnType<
  typeof useBookOptionsSuspenseQuery
>;
export type BookOptionsQueryResult = Apollo.QueryResult<
  BookOptionsQuery,
  BookOptionsQueryVariables
>;
export const BookDocument = gql`
  query Book($bookId: Int!) {
    book(bookId: $bookId) {
      ...book
    }
  }
  ${BookFragmentDoc}
`;

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
export function useBookQuery(
  baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables> &
    ({ variables: BookQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
}
export function useBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(
    BookDocument,
    options,
  );
}
export function useBookSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<BookQuery, BookQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<BookQuery, BookQueryVariables>(
    BookDocument,
    options,
  );
}
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookSuspenseQueryHookResult = ReturnType<
  typeof useBookSuspenseQuery
>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const HomePageDataDocument = gql`
  query HomePageData($month: Int!, $year: Int!) {
    editorPicks: paginatedBooks(page: 1, take: 6) {
      books {
        ...book
      }
    }
    recentUpdates: paginatedBooks(
      page: 1
      take: 10
      sortBy: "newChapterAt"
      sortOrder: desc
    ) {
      books {
        ...book
      }
    }
    mostReadBooks: paginatedRankingBooks(
      page: 1
      take: 10
      type: read
      month: $month
      year: $year
    ) {
      books {
        ...book
        readMonthly
      }
    }
    topNominations: paginatedRankingBooks(
      page: 1
      take: 10
      type: nominate
      month: $month
      year: $year
    ) {
      books {
        ...book
        nominateMonthly
      }
    }
  }
  ${BookFragmentDoc}
`;

/**
 * __useHomePageDataQuery__
 *
 * To run a query within a React component, call `useHomePageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageDataQuery({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useHomePageDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    HomePageDataQuery,
    HomePageDataQueryVariables
  > &
    (
      | { variables: HomePageDataQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomePageDataQuery, HomePageDataQueryVariables>(
    HomePageDataDocument,
    options,
  );
}
export function useHomePageDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomePageDataQuery,
    HomePageDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomePageDataQuery, HomePageDataQueryVariables>(
    HomePageDataDocument,
    options,
  );
}
export function useHomePageDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        HomePageDataQuery,
        HomePageDataQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<HomePageDataQuery, HomePageDataQueryVariables>(
    HomePageDataDocument,
    options,
  );
}
export type HomePageDataQueryHookResult = ReturnType<
  typeof useHomePageDataQuery
>;
export type HomePageDataLazyQueryHookResult = ReturnType<
  typeof useHomePageDataLazyQuery
>;
export type HomePageDataSuspenseQueryHookResult = ReturnType<
  typeof useHomePageDataSuspenseQuery
>;
export type HomePageDataQueryResult = Apollo.QueryResult<
  HomePageDataQuery,
  HomePageDataQueryVariables
>;
export const CreatedBooksDocument = gql`
  query CreatedBooks(
    $page: Int!
    $take: Int!
    $keyword: String!
    $gender: Int
    $genreId: Int
    $tagIds: [Int!]
    $sortBy: String
    $sortOrder: SortOrder
  ) {
    createdBooks(
      page: $page
      take: $take
      keyword: $keyword
      gender: $gender
      genreId: $genreId
      tagIds: $tagIds
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      total
      books {
        ...book
      }
      prev
      next
      totalPages
    }
  }
  ${BookFragmentDoc}
`;

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
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useCreatedBooksQuery(
  baseOptions: Apollo.QueryHookOptions<
    CreatedBooksQuery,
    CreatedBooksQueryVariables
  > &
    (
      | { variables: CreatedBooksQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CreatedBooksQuery, CreatedBooksQueryVariables>(
    CreatedBooksDocument,
    options,
  );
}
export function useCreatedBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CreatedBooksQuery,
    CreatedBooksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CreatedBooksQuery, CreatedBooksQueryVariables>(
    CreatedBooksDocument,
    options,
  );
}
export function useCreatedBooksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        CreatedBooksQuery,
        CreatedBooksQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CreatedBooksQuery, CreatedBooksQueryVariables>(
    CreatedBooksDocument,
    options,
  );
}
export type CreatedBooksQueryHookResult = ReturnType<
  typeof useCreatedBooksQuery
>;
export type CreatedBooksLazyQueryHookResult = ReturnType<
  typeof useCreatedBooksLazyQuery
>;
export type CreatedBooksSuspenseQueryHookResult = ReturnType<
  typeof useCreatedBooksSuspenseQuery
>;
export type CreatedBooksQueryResult = Apollo.QueryResult<
  CreatedBooksQuery,
  CreatedBooksQueryVariables
>;
export const ChapterByBookAndOrderDocument = gql`
  query ChapterByBookAndOrder($order: Int!, $bookId: Int!) {
    chapterByBookAndOrder(order: $order, bookId: $bookId) {
      ...chapter
      content
      book {
        name
      }
    }
  }
  ${ChapterFragmentDoc}
`;

/**
 * __useChapterByBookAndOrderQuery__
 *
 * To run a query within a React component, call `useChapterByBookAndOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterByBookAndOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterByBookAndOrderQuery({
 *   variables: {
 *      order: // value for 'order'
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useChapterByBookAndOrderQuery(
  baseOptions: Apollo.QueryHookOptions<
    ChapterByBookAndOrderQuery,
    ChapterByBookAndOrderQueryVariables
  > &
    (
      | { variables: ChapterByBookAndOrderQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ChapterByBookAndOrderQuery,
    ChapterByBookAndOrderQueryVariables
  >(ChapterByBookAndOrderDocument, options);
}
export function useChapterByBookAndOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChapterByBookAndOrderQuery,
    ChapterByBookAndOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ChapterByBookAndOrderQuery,
    ChapterByBookAndOrderQueryVariables
  >(ChapterByBookAndOrderDocument, options);
}
export function useChapterByBookAndOrderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ChapterByBookAndOrderQuery,
        ChapterByBookAndOrderQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ChapterByBookAndOrderQuery,
    ChapterByBookAndOrderQueryVariables
  >(ChapterByBookAndOrderDocument, options);
}
export type ChapterByBookAndOrderQueryHookResult = ReturnType<
  typeof useChapterByBookAndOrderQuery
>;
export type ChapterByBookAndOrderLazyQueryHookResult = ReturnType<
  typeof useChapterByBookAndOrderLazyQuery
>;
export type ChapterByBookAndOrderSuspenseQueryHookResult = ReturnType<
  typeof useChapterByBookAndOrderSuspenseQuery
>;
export type ChapterByBookAndOrderQueryResult = Apollo.QueryResult<
  ChapterByBookAndOrderQuery,
  ChapterByBookAndOrderQueryVariables
>;
export const ChaptersDocument = gql`
  query Chapters($bookId: Int!) {
    chapters(bookId: $bookId) {
      ...chapter
    }
  }
  ${ChapterFragmentDoc}
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
export function useChaptersQuery(
  baseOptions: Apollo.QueryHookOptions<ChaptersQuery, ChaptersQueryVariables> &
    ({ variables: ChaptersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ChaptersQuery, ChaptersQueryVariables>(
    ChaptersDocument,
    options,
  );
}
export function useChaptersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChaptersQuery,
    ChaptersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ChaptersQuery, ChaptersQueryVariables>(
    ChaptersDocument,
    options,
  );
}
export function useChaptersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ChaptersQuery, ChaptersQueryVariables>(
    ChaptersDocument,
    options,
  );
}
export type ChaptersQueryHookResult = ReturnType<typeof useChaptersQuery>;
export type ChaptersLazyQueryHookResult = ReturnType<
  typeof useChaptersLazyQuery
>;
export type ChaptersSuspenseQueryHookResult = ReturnType<
  typeof useChaptersSuspenseQuery
>;
export type ChaptersQueryResult = Apollo.QueryResult<
  ChaptersQuery,
  ChaptersQueryVariables
>;
export const FullDocument = gql`
  query Full {
    me {
      ...user
    }
  }
  ${UserFragmentDoc}
`;

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
export function useFullQuery(
  baseOptions?: Apollo.QueryHookOptions<FullQuery, FullQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FullQuery, FullQueryVariables>(FullDocument, options);
}
export function useFullLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FullQuery, FullQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FullQuery, FullQueryVariables>(
    FullDocument,
    options,
  );
}
export function useFullSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<FullQuery, FullQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<FullQuery, FullQueryVariables>(
    FullDocument,
    options,
  );
}
export type FullQueryHookResult = ReturnType<typeof useFullQuery>;
export type FullLazyQueryHookResult = ReturnType<typeof useFullLazyQuery>;
export type FullSuspenseQueryHookResult = ReturnType<
  typeof useFullSuspenseQuery
>;
export type FullQueryResult = Apollo.QueryResult<FullQuery, FullQueryVariables>;
