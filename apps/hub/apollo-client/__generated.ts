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
  country: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  chapterNumber: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['Int']['output'];
  novel?: Maybe<Novel>;
  novelId: Scalars['Int']['output'];
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

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

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
  changeCoverImage: Novel;
  changeProfile: User;
  createChapter: ChapterMutationResponse;
  deleteChapters: MutationResponse;
  deleteGenres: MutationResponse;
  deleteNovel: MutationResponse;
  deleteTagGroups: MutationResponse;
  deleteTags: MutationResponse;
  googleLogin: LoginResponse;
  login: LoginResponse;
  logout: Scalars['Boolean']['output'];
  mutationGenre: Genre;
  mutationNovel: Novel;
  mutationTag: Tag;
  mutationTagGroup: TagGroup;
  newPassword: MutationResponse;
  passwordReset: MutationResponse;
  refreshToken?: Maybe<Scalars['String']['output']>;
  register: MutationResponse;
  resendTwoFactorCode: MutationResponse;
  swapChapters: Array<Chapter>;
  updateChapter: ChapterMutationResponse;
  updateChapters: MutationResponse;
  updateCopyright?: Maybe<Scalars['Boolean']['output']>;
  updateNotifications: Notifications;
  updatePrivacyPolicy?: Maybe<Scalars['Boolean']['output']>;
  updateTermsOfService?: Maybe<Scalars['Boolean']['output']>;
  updateTwoFactor: TwoFactorResponse;
  verification: MutationResponse;
};


export type MutationChangeAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};


export type MutationChangeCoverImageArgs = {
  coverImage: Scalars['Upload']['input'];
  novelId: Scalars['Int']['input'];
};


export type MutationChangeProfileArgs = {
  bio: Scalars['String']['input'];
  birthDate: Scalars['Timestamp']['input'];
  gender: Gender;
  nickname: Scalars['String']['input'];
  socialLinks: Array<Scalars['String']['input']>;
};


export type MutationCreateChapterArgs = {
  NovelId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  publishAt: Scalars['Timestamp']['input'];
  title: Scalars['String']['input'];
  unlockPrice: Scalars['Int']['input'];
};


export type MutationDeleteChaptersArgs = {
  NovelId: Scalars['Int']['input'];
  chapterIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteGenresArgs = {
  genreIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteNovelArgs = {
  novelId: Scalars['Int']['input'];
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


export type MutationMutationGenreArgs = {
  genreId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};


export type MutationMutationNovelArgs = {
  gender: Gender;
  genreId: Scalars['Int']['input'];
  novelId?: InputMaybe<Scalars['Int']['input']>;
  status: NovelStatus;
  synopsis: Scalars['String']['input'];
  tagIds: Array<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};


export type MutationMutationTagArgs = {
  name: Scalars['String']['input'];
  tagGroupId: Scalars['Int']['input'];
  tagId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationMutationTagGroupArgs = {
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagGroupId?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationSwapChaptersArgs = {
  NovelId: Scalars['Int']['input'];
  data: Array<SwapChapterInput>;
};


export type MutationUpdateChapterArgs = {
  NovelId: Scalars['Int']['input'];
  chapterId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  publishAt: Scalars['Timestamp']['input'];
  title: Scalars['String']['input'];
  unlockPrice: Scalars['Int']['input'];
};


export type MutationUpdateChaptersArgs = {
  NovelId: Scalars['Int']['input'];
  chapterIds: Array<Scalars['Int']['input']>;
  publishAt: Scalars['Timestamp']['input'];
  unlockPrice: Scalars['Int']['input'];
};


export type MutationUpdateCopyrightArgs = {
  value: Scalars['String']['input'];
};


export type MutationUpdateNotificationsArgs = {
  enableInteractions: Scalars['Boolean']['input'];
  enableNewChapter: Scalars['Boolean']['input'];
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

export type Notifications = {
  __typename?: 'Notifications';
  enableInteractions: Scalars['Boolean']['output'];
  enableNewChapter: Scalars['Boolean']['output'];
  userId: Scalars['Int']['output'];
};

export type Novel = {
  __typename?: 'Novel';
  author?: Maybe<Author>;
  authorId?: Maybe<Scalars['Int']['output']>;
  coverImage: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  gender: Gender;
  genre: Genre;
  genreId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  kind: NovelKind;
  newChapterAt: Scalars['Timestamp']['output'];
  nominateMonthly?: Maybe<Scalars['Int']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['Timestamp']['output']>;
  readMonthly?: Maybe<Scalars['Int']['output']>;
  status: NovelStatus;
  synopsis: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  totalChapters: Scalars['Int']['output'];
  wordCount: Scalars['Int']['output'];
};

export enum NovelKind {
  Original = 'Original',
  Translation = 'Translation'
}

export enum NovelStatus {
  Completed = 'Completed',
  Ongoing = 'Ongoing',
  Paused = 'Paused'
}

export type PaginatedNovelsResponse = {
  __typename?: 'PaginatedNovelsResponse';
  next?: Maybe<Scalars['Int']['output']>;
  novels: Array<Novel>;
  prev?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export enum PaginatedRankingType {
  Comment = 'comment',
  Flower = 'flower',
  Nominate = 'nominate',
  Read = 'read',
  Review = 'review'
}

export type Query = {
  __typename?: 'Query';
  chapterById?: Maybe<Chapter>;
  chapterByNovelAndOrder?: Maybe<Chapter>;
  chapters: Array<Chapter>;
  copyright?: Maybe<Scalars['String']['output']>;
  genres: Array<Genre>;
  me?: Maybe<User>;
  myNovels: PaginatedNovelsResponse;
  novel?: Maybe<Novel>;
  paginatedNovels: PaginatedNovelsResponse;
  paginatedRankingNovels: PaginatedNovelsResponse;
  privacyPolicy?: Maybe<Scalars['String']['output']>;
  tagGroups: Array<TagGroup>;
  tags: Array<Tag>;
  termsOfService?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};


export type QueryChapterByIdArgs = {
  chapterId: Scalars['Int']['input'];
};


export type QueryChapterByNovelAndOrderArgs = {
  chapterNumber: Scalars['Int']['input'];
  novelId: Scalars['Int']['input'];
};


export type QueryChaptersArgs = {
  novelId: Scalars['Int']['input'];
};


export type QueryMyNovelsArgs = {
  gender?: InputMaybe<Gender>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  keyword?: Scalars['String']['input'];
  page?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  take?: Scalars['Int']['input'];
};


export type QueryNovelArgs = {
  novelId: Scalars['Int']['input'];
};


export type QueryPaginatedNovelsArgs = {
  gender?: InputMaybe<Gender>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  keyword?: Scalars['String']['input'];
  page?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  take?: Scalars['Int']['input'];
};


export type QueryPaginatedRankingNovelsArgs = {
  month: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  type: PaginatedRankingType;
  year: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
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
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tagGroupId: Scalars['Int']['output'];
};

export type TagGroup = {
  __typename?: 'TagGroup';
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
  bio: Scalars['String']['output'];
  birthDate: Scalars['Timestamp']['output'];
  candies: Scalars['Int']['output'];
  coverImage: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  emailVerifiedAt?: Maybe<Scalars['Timestamp']['output']>;
  gender: Gender;
  id: Scalars['Int']['output'];
  isTwoFactorAuth: Scalars['Boolean']['output'];
  keys: Scalars['Int']['output'];
  nickname: Scalars['String']['output'];
  notifications: Notifications;
  phone: Scalars['String']['output'];
  role: UserRole;
  socialLinks: Array<Scalars['String']['output']>;
  tickets: Scalars['Int']['output'];
};

/** The role of the user in the system */
export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export type MutationGenreMutationVariables = Exact<{
  genreId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
}>;


export type MutationGenreMutation = { __typename?: 'Mutation', mutationGenre: { __typename?: 'Genre', id: number, name: string } };

export type DeleteGenresMutationVariables = Exact<{
  genreIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteGenresMutation = { __typename?: 'Mutation', deleteGenres: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string }> };

export type NovelFragment = { __typename?: 'Novel', id: number, title: string, originalTitle?: string | null, authorId?: number | null, synopsis: string, kind: NovelKind, gender: Gender, status: NovelStatus, coverImage: string, genreId: number, wordCount: number, totalChapters: number, publishedAt?: any | null, createdAt: any, newChapterAt: any, createdById: number, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, coverImage: string }, genre: { __typename?: 'Genre', id: number, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string } }>, author?: { __typename?: 'Author', id: number, name: string, originalName: string, country: string } | null };

export type MutationNovelMutationVariables = Exact<{
  status: NovelStatus;
  title: Scalars['String']['input'];
  synopsis: Scalars['String']['input'];
  gender: Gender;
  genreId: Scalars['Int']['input'];
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  novelId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MutationNovelMutation = { __typename?: 'Mutation', mutationNovel: { __typename?: 'Novel', id: number, title: string, originalTitle?: string | null, authorId?: number | null, synopsis: string, kind: NovelKind, gender: Gender, status: NovelStatus, coverImage: string, genreId: number, wordCount: number, totalChapters: number, publishedAt?: any | null, createdAt: any, newChapterAt: any, createdById: number, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, coverImage: string }, genre: { __typename?: 'Genre', id: number, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string } }>, author?: { __typename?: 'Author', id: number, name: string, originalName: string, country: string } | null } };

export type MyNovelsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  keyword: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  genreId?: InputMaybe<Scalars['Int']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
}>;


export type MyNovelsQuery = { __typename?: 'Query', myNovels: { __typename?: 'PaginatedNovelsResponse', total: number, prev?: number | null, next?: number | null, totalPages: number, novels: Array<{ __typename?: 'Novel', id: number, title: string, originalTitle?: string | null, authorId?: number | null, synopsis: string, kind: NovelKind, gender: Gender, status: NovelStatus, coverImage: string, genreId: number, wordCount: number, totalChapters: number, publishedAt?: any | null, createdAt: any, newChapterAt: any, createdById: number, createdBy: { __typename?: 'User', id: number, nickname: string, avatar: string, coverImage: string }, genre: { __typename?: 'Genre', id: number, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string } }>, author?: { __typename?: 'Author', id: number, name: string, originalName: string, country: string } | null }> } };

export type DeleteNovelMutationVariables = Exact<{
  novelId: Scalars['Int']['input'];
}>;


export type DeleteNovelMutation = { __typename?: 'Mutation', deleteNovel: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type NovelOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type NovelOptionsQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, name: string }>, tags: Array<{ __typename?: 'Tag', id: number, name: string, tagGroupId: number, group: { __typename?: 'TagGroup', id: number, name: string, color: string } }>, tagGroups: Array<{ __typename?: 'TagGroup', id: number, name: string, color: string }> };

export type DeleteTagGroupsMutationVariables = Exact<{
  tagGroupIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteTagGroupsMutation = { __typename?: 'Mutation', deleteTagGroups: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type MutationTagGroupMutationVariables = Exact<{
  color: Scalars['String']['input'];
  name: Scalars['String']['input'];
  tagGroupId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MutationTagGroupMutation = { __typename?: 'Mutation', mutationTagGroup: { __typename?: 'TagGroup', id: number, name: string, color: string } };

export type TagFragment = { __typename?: 'Tag', id: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string } };

export type MutationTagMutationVariables = Exact<{
  tagGroupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  tagId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MutationTagMutation = { __typename?: 'Mutation', mutationTag: { __typename?: 'Tag', id: number, tagGroupId: number, name: string, group: { __typename?: 'TagGroup', id: number, name: string, color: string } } };

export type DeleteTagsMutationVariables = Exact<{
  tagIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteTagsMutation = { __typename?: 'Mutation', deleteTags: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UserFragment = { __typename?: 'User', id: number, nickname: string, email: string, phone: string, avatar: string, coverImage: string, role: UserRole, gender: Gender, bio: string, birthDate: any, socialLinks: Array<string>, keys: number, tickets: number, candies: number, createdAt: any, emailVerifiedAt?: any | null, isTwoFactorAuth: boolean };

export type RegisterMutationVariables = Exact<{
  nickname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', success: boolean, message: string, accessToken?: string | null, twoFactor?: boolean | null } };

export type GoogleLoginMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'LoginResponse', success: boolean, message: string, accessToken?: string | null, twoFactor?: boolean | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: string | null };

export type VerificationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerificationMutation = { __typename?: 'Mutation', verification: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type PasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type PasswordResetMutation = { __typename?: 'Mutation', passwordReset: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type NewPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', newPassword: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type UpdateTwoFactorMutationVariables = Exact<{
  isTwoFactorEnable: Scalars['Boolean']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTwoFactorMutation = { __typename?: 'Mutation', updateTwoFactor: { __typename?: 'TwoFactorResponse', success: boolean, message: string, twoFactor?: boolean | null } };

export type ResendTwoFactorCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendTwoFactorCodeMutation = { __typename?: 'Mutation', resendTwoFactorCode: { __typename?: 'MutationResponse', success: boolean, message: string } };

export type FullQueryVariables = Exact<{ [key: string]: never; }>;


export type FullQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, nickname: string, email: string, phone: string, avatar: string, coverImage: string, role: UserRole, gender: Gender, bio: string, birthDate: any, socialLinks: Array<string>, keys: number, tickets: number, candies: number, createdAt: any, emailVerifiedAt?: any | null, isTwoFactorAuth: boolean } | null };

export const TagFragmentDoc = gql`
    fragment tag on Tag {
  id
  name
  group {
    id
    name
    color
  }
}
    `;
export const NovelFragmentDoc = gql`
    fragment novel on Novel {
  id
  title
  originalTitle
  authorId
  synopsis
  kind
  gender
  status
  coverImage
  genreId
  wordCount
  totalChapters
  publishedAt
  createdAt
  newChapterAt
  createdById
  createdBy {
    id
    nickname
    avatar
    coverImage
  }
  genre {
    id
    name
  }
  tags {
    ...tag
  }
  author {
    id
    name
    originalName
    country
  }
}
    ${TagFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  nickname
  email
  phone
  avatar
  coverImage
  role
  gender
  bio
  birthDate
  socialLinks
  keys
  tickets
  candies
  createdAt
  emailVerifiedAt
  isTwoFactorAuth
}
    `;
export const MutationGenreDocument = gql`
    mutation MutationGenre($genreId: Int, $name: String!) {
  mutationGenre(genreId: $genreId, name: $name) {
    id
    name
  }
}
    `;
export type MutationGenreMutationFn = Apollo.MutationFunction<MutationGenreMutation, MutationGenreMutationVariables>;

/**
 * __useMutationGenreMutation__
 *
 * To run a mutation, you first call `useMutationGenreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationGenreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationGenreMutation, { data, loading, error }] = useMutationGenreMutation({
 *   variables: {
 *      genreId: // value for 'genreId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useMutationGenreMutation(baseOptions?: Apollo.MutationHookOptions<MutationGenreMutation, MutationGenreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationGenreMutation, MutationGenreMutationVariables>(MutationGenreDocument, options);
      }
export type MutationGenreMutationHookResult = ReturnType<typeof useMutationGenreMutation>;
export type MutationGenreMutationResult = Apollo.MutationResult<MutationGenreMutation>;
export type MutationGenreMutationOptions = Apollo.BaseMutationOptions<MutationGenreMutation, MutationGenreMutationVariables>;
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
export const GenresDocument = gql`
    query Genres {
  genres {
    id
    name
  }
}
    `;

/**
 * __useGenresQuery__
 *
 * To run a query within a React component, call `useGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenresQuery(baseOptions?: Apollo.QueryHookOptions<GenresQuery, GenresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenresQuery, GenresQueryVariables>(GenresDocument, options);
      }
export function useGenresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenresQuery, GenresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenresQuery, GenresQueryVariables>(GenresDocument, options);
        }
export function useGenresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenresQuery, GenresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenresQuery, GenresQueryVariables>(GenresDocument, options);
        }
export type GenresQueryHookResult = ReturnType<typeof useGenresQuery>;
export type GenresLazyQueryHookResult = ReturnType<typeof useGenresLazyQuery>;
export type GenresSuspenseQueryHookResult = ReturnType<typeof useGenresSuspenseQuery>;
export type GenresQueryResult = Apollo.QueryResult<GenresQuery, GenresQueryVariables>;
export const MutationNovelDocument = gql`
    mutation MutationNovel($status: NovelStatus!, $title: String!, $synopsis: String!, $gender: Gender!, $genreId: Int!, $tagIds: [Int!]!, $novelId: Int) {
  mutationNovel(
    status: $status
    title: $title
    synopsis: $synopsis
    gender: $gender
    genreId: $genreId
    tagIds: $tagIds
    novelId: $novelId
  ) {
    ...novel
  }
}
    ${NovelFragmentDoc}`;
export type MutationNovelMutationFn = Apollo.MutationFunction<MutationNovelMutation, MutationNovelMutationVariables>;

/**
 * __useMutationNovelMutation__
 *
 * To run a mutation, you first call `useMutationNovelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationNovelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationNovelMutation, { data, loading, error }] = useMutationNovelMutation({
 *   variables: {
 *      status: // value for 'status'
 *      title: // value for 'title'
 *      synopsis: // value for 'synopsis'
 *      gender: // value for 'gender'
 *      genreId: // value for 'genreId'
 *      tagIds: // value for 'tagIds'
 *      novelId: // value for 'novelId'
 *   },
 * });
 */
export function useMutationNovelMutation(baseOptions?: Apollo.MutationHookOptions<MutationNovelMutation, MutationNovelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationNovelMutation, MutationNovelMutationVariables>(MutationNovelDocument, options);
      }
export type MutationNovelMutationHookResult = ReturnType<typeof useMutationNovelMutation>;
export type MutationNovelMutationResult = Apollo.MutationResult<MutationNovelMutation>;
export type MutationNovelMutationOptions = Apollo.BaseMutationOptions<MutationNovelMutation, MutationNovelMutationVariables>;
export const MyNovelsDocument = gql`
    query MyNovels($page: Int!, $take: Int!, $keyword: String!, $gender: Gender, $genreId: Int, $tagIds: [Int!], $sortBy: String, $sortOrder: SortOrder) {
  myNovels(
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
    novels {
      ...novel
    }
    prev
    next
    totalPages
  }
}
    ${NovelFragmentDoc}`;

/**
 * __useMyNovelsQuery__
 *
 * To run a query within a React component, call `useMyNovelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNovelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNovelsQuery({
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
export function useMyNovelsQuery(baseOptions: Apollo.QueryHookOptions<MyNovelsQuery, MyNovelsQueryVariables> & ({ variables: MyNovelsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNovelsQuery, MyNovelsQueryVariables>(MyNovelsDocument, options);
      }
export function useMyNovelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNovelsQuery, MyNovelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNovelsQuery, MyNovelsQueryVariables>(MyNovelsDocument, options);
        }
export function useMyNovelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyNovelsQuery, MyNovelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyNovelsQuery, MyNovelsQueryVariables>(MyNovelsDocument, options);
        }
export type MyNovelsQueryHookResult = ReturnType<typeof useMyNovelsQuery>;
export type MyNovelsLazyQueryHookResult = ReturnType<typeof useMyNovelsLazyQuery>;
export type MyNovelsSuspenseQueryHookResult = ReturnType<typeof useMyNovelsSuspenseQuery>;
export type MyNovelsQueryResult = Apollo.QueryResult<MyNovelsQuery, MyNovelsQueryVariables>;
export const DeleteNovelDocument = gql`
    mutation DeleteNovel($novelId: Int!) {
  deleteNovel(novelId: $novelId) {
    success
    message
  }
}
    `;
export type DeleteNovelMutationFn = Apollo.MutationFunction<DeleteNovelMutation, DeleteNovelMutationVariables>;

/**
 * __useDeleteNovelMutation__
 *
 * To run a mutation, you first call `useDeleteNovelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNovelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNovelMutation, { data, loading, error }] = useDeleteNovelMutation({
 *   variables: {
 *      novelId: // value for 'novelId'
 *   },
 * });
 */
export function useDeleteNovelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNovelMutation, DeleteNovelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNovelMutation, DeleteNovelMutationVariables>(DeleteNovelDocument, options);
      }
export type DeleteNovelMutationHookResult = ReturnType<typeof useDeleteNovelMutation>;
export type DeleteNovelMutationResult = Apollo.MutationResult<DeleteNovelMutation>;
export type DeleteNovelMutationOptions = Apollo.BaseMutationOptions<DeleteNovelMutation, DeleteNovelMutationVariables>;
export const NovelOptionsDocument = gql`
    query NovelOptions {
  genres {
    id
    name
  }
  tags {
    id
    name
    tagGroupId
    group {
      id
      name
      color
    }
  }
  tagGroups {
    id
    name
    color
  }
}
    `;

/**
 * __useNovelOptionsQuery__
 *
 * To run a query within a React component, call `useNovelOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNovelOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNovelOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNovelOptionsQuery(baseOptions?: Apollo.QueryHookOptions<NovelOptionsQuery, NovelOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NovelOptionsQuery, NovelOptionsQueryVariables>(NovelOptionsDocument, options);
      }
export function useNovelOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NovelOptionsQuery, NovelOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NovelOptionsQuery, NovelOptionsQueryVariables>(NovelOptionsDocument, options);
        }
export function useNovelOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NovelOptionsQuery, NovelOptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NovelOptionsQuery, NovelOptionsQueryVariables>(NovelOptionsDocument, options);
        }
export type NovelOptionsQueryHookResult = ReturnType<typeof useNovelOptionsQuery>;
export type NovelOptionsLazyQueryHookResult = ReturnType<typeof useNovelOptionsLazyQuery>;
export type NovelOptionsSuspenseQueryHookResult = ReturnType<typeof useNovelOptionsSuspenseQuery>;
export type NovelOptionsQueryResult = Apollo.QueryResult<NovelOptionsQuery, NovelOptionsQueryVariables>;
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
export const MutationTagGroupDocument = gql`
    mutation MutationTagGroup($color: String!, $name: String!, $tagGroupId: Int) {
  mutationTagGroup(color: $color, name: $name, tagGroupId: $tagGroupId) {
    id
    name
    color
  }
}
    `;
export type MutationTagGroupMutationFn = Apollo.MutationFunction<MutationTagGroupMutation, MutationTagGroupMutationVariables>;

/**
 * __useMutationTagGroupMutation__
 *
 * To run a mutation, you first call `useMutationTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationTagGroupMutation, { data, loading, error }] = useMutationTagGroupMutation({
 *   variables: {
 *      color: // value for 'color'
 *      name: // value for 'name'
 *      tagGroupId: // value for 'tagGroupId'
 *   },
 * });
 */
export function useMutationTagGroupMutation(baseOptions?: Apollo.MutationHookOptions<MutationTagGroupMutation, MutationTagGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationTagGroupMutation, MutationTagGroupMutationVariables>(MutationTagGroupDocument, options);
      }
export type MutationTagGroupMutationHookResult = ReturnType<typeof useMutationTagGroupMutation>;
export type MutationTagGroupMutationResult = Apollo.MutationResult<MutationTagGroupMutation>;
export type MutationTagGroupMutationOptions = Apollo.BaseMutationOptions<MutationTagGroupMutation, MutationTagGroupMutationVariables>;
export const MutationTagDocument = gql`
    mutation MutationTag($tagGroupId: Int!, $name: String!, $tagId: Int) {
  mutationTag(tagGroupId: $tagGroupId, name: $name, tagId: $tagId) {
    id
    tagGroupId
    name
    group {
      id
      name
      color
    }
  }
}
    `;
export type MutationTagMutationFn = Apollo.MutationFunction<MutationTagMutation, MutationTagMutationVariables>;

/**
 * __useMutationTagMutation__
 *
 * To run a mutation, you first call `useMutationTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationTagMutation, { data, loading, error }] = useMutationTagMutation({
 *   variables: {
 *      tagGroupId: // value for 'tagGroupId'
 *      name: // value for 'name'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useMutationTagMutation(baseOptions?: Apollo.MutationHookOptions<MutationTagMutation, MutationTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationTagMutation, MutationTagMutationVariables>(MutationTagDocument, options);
      }
export type MutationTagMutationHookResult = ReturnType<typeof useMutationTagMutation>;
export type MutationTagMutationResult = Apollo.MutationResult<MutationTagMutation>;
export type MutationTagMutationOptions = Apollo.BaseMutationOptions<MutationTagMutation, MutationTagMutationVariables>;
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
export const RegisterDocument = gql`
    mutation Register($nickname: String!, $email: String!, $password: String!) {
  register(nickname: $nickname, email: $email, password: $password) {
    success
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export type GoogleLoginMutationFn = Apollo.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;

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
export function useGoogleLoginMutation(baseOptions?: Apollo.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
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
export const VerificationDocument = gql`
    mutation Verification($token: String!) {
  verification(token: $token) {
    success
    message
  }
}
    `;
export type VerificationMutationFn = Apollo.MutationFunction<VerificationMutation, VerificationMutationVariables>;

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
export function useVerificationMutation(baseOptions?: Apollo.MutationHookOptions<VerificationMutation, VerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerificationMutation, VerificationMutationVariables>(VerificationDocument, options);
      }
export type VerificationMutationHookResult = ReturnType<typeof useVerificationMutation>;
export type VerificationMutationResult = Apollo.MutationResult<VerificationMutation>;
export type VerificationMutationOptions = Apollo.BaseMutationOptions<VerificationMutation, VerificationMutationVariables>;
export const PasswordResetDocument = gql`
    mutation PasswordReset($email: String!) {
  passwordReset(email: $email) {
    success
    message
  }
}
    `;
export type PasswordResetMutationFn = Apollo.MutationFunction<PasswordResetMutation, PasswordResetMutationVariables>;

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
export function usePasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<PasswordResetMutation, PasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PasswordResetMutation, PasswordResetMutationVariables>(PasswordResetDocument, options);
      }
export type PasswordResetMutationHookResult = ReturnType<typeof usePasswordResetMutation>;
export type PasswordResetMutationResult = Apollo.MutationResult<PasswordResetMutation>;
export type PasswordResetMutationOptions = Apollo.BaseMutationOptions<PasswordResetMutation, PasswordResetMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($token: String!, $newPassword: String!) {
  newPassword(token: $token, newPassword: $newPassword) {
    success
    message
  }
}
    `;
export type NewPasswordMutationFn = Apollo.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

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
export function useNewPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const UpdateTwoFactorDocument = gql`
    mutation UpdateTwoFactor($isTwoFactorEnable: Boolean!, $code: String) {
  updateTwoFactor(isTwoFactorEnable: $isTwoFactorEnable, code: $code) {
    success
    message
    twoFactor
  }
}
    `;
export type UpdateTwoFactorMutationFn = Apollo.MutationFunction<UpdateTwoFactorMutation, UpdateTwoFactorMutationVariables>;

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
export function useUpdateTwoFactorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTwoFactorMutation, UpdateTwoFactorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTwoFactorMutation, UpdateTwoFactorMutationVariables>(UpdateTwoFactorDocument, options);
      }
export type UpdateTwoFactorMutationHookResult = ReturnType<typeof useUpdateTwoFactorMutation>;
export type UpdateTwoFactorMutationResult = Apollo.MutationResult<UpdateTwoFactorMutation>;
export type UpdateTwoFactorMutationOptions = Apollo.BaseMutationOptions<UpdateTwoFactorMutation, UpdateTwoFactorMutationVariables>;
export const ResendTwoFactorCodeDocument = gql`
    mutation ResendTwoFactorCode($email: String!) {
  resendTwoFactorCode(email: $email) {
    success
    message
  }
}
    `;
export type ResendTwoFactorCodeMutationFn = Apollo.MutationFunction<ResendTwoFactorCodeMutation, ResendTwoFactorCodeMutationVariables>;

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
export function useResendTwoFactorCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendTwoFactorCodeMutation, ResendTwoFactorCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendTwoFactorCodeMutation, ResendTwoFactorCodeMutationVariables>(ResendTwoFactorCodeDocument, options);
      }
export type ResendTwoFactorCodeMutationHookResult = ReturnType<typeof useResendTwoFactorCodeMutation>;
export type ResendTwoFactorCodeMutationResult = Apollo.MutationResult<ResendTwoFactorCodeMutation>;
export type ResendTwoFactorCodeMutationOptions = Apollo.BaseMutationOptions<ResendTwoFactorCodeMutation, ResendTwoFactorCodeMutationVariables>;
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