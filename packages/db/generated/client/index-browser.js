
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.0
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.0",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  nickname: 'nickname',
  email: 'email',
  password: 'password',
  phone: 'phone',
  avatar: 'avatar',
  coverImage: 'coverImage',
  role: 'role',
  gender: 'gender',
  bio: 'bio',
  birthDate: 'birthDate',
  socialLinks: 'socialLinks',
  keys: 'keys',
  tickets: 'tickets',
  candies: 'candies',
  createdAt: 'createdAt',
  emailVerifiedAt: 'emailVerifiedAt',
  isTwoFactorAuth: 'isTwoFactorAuth'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationSettingsScalarFieldEnum = {
  userId: 'userId',
  enableNewChapter: 'enableNewChapter',
  enableInteractions: 'enableInteractions'
};

exports.Prisma.AuthorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  originalName: 'originalName',
  country: 'country'
};

exports.Prisma.NovelScalarFieldEnum = {
  id: 'id',
  title: 'title',
  originalTitle: 'originalTitle',
  authorId: 'authorId',
  createdById: 'createdById',
  genreId: 'genreId',
  kind: 'kind',
  gender: 'gender',
  status: 'status',
  synopsis: 'synopsis',
  coverImage: 'coverImage',
  wordCount: 'wordCount',
  totalChapters: 'totalChapters',
  publishedAt: 'publishedAt',
  newChapterAt: 'newChapterAt',
  createdAt: 'createdAt'
};

exports.Prisma.GenreScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  tagGroupId: 'tagGroupId'
};

exports.Prisma.TagGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  color: 'color'
};

exports.Prisma.NovelTagScalarFieldEnum = {
  novelId: 'novelId',
  tagId: 'tagId'
};

exports.Prisma.ChapterScalarFieldEnum = {
  id: 'id',
  novelId: 'novelId',
  chapterNumber: 'chapterNumber',
  title: 'title',
  content: 'content',
  isLocked: 'isLocked',
  unlockCost: 'unlockCost',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  content: 'content',
  isSpoiler: 'isSpoiler',
  userId: 'userId',
  novelId: 'novelId',
  createdAt: 'createdAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  likes: 'likes',
  userId: 'userId',
  chapterId: 'chapterId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  novelId: 'novelId'
};

exports.Prisma.ReplyCommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  likes: 'likes',
  userId: 'userId',
  commentId: 'commentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReadingScalarFieldEnum = {
  userId: 'userId',
  novelId: 'novelId',
  chapterId: 'chapterId',
  lastRead: 'lastRead'
};

exports.Prisma.FavoriteScalarFieldEnum = {
  userId: 'userId',
  novelId: 'novelId',
  createdAt: 'createdAt'
};

exports.Prisma.NovelStatisticScalarFieldEnum = {
  id: 'id',
  novelId: 'novelId',
  dailyViews: 'dailyViews',
  totalViews: 'totalViews',
  reviews: 'reviews',
  comments: 'comments',
  date: 'date'
};

exports.Prisma.ChapterStatisticScalarFieldEnum = {
  id: 'id',
  chapterId: 'chapterId',
  views: 'views',
  date: 'date'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  Admin: 'Admin',
  User: 'User'
};

exports.Gender = exports.$Enums.Gender = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other'
};

exports.NovelKind = exports.$Enums.NovelKind = {
  Translation: 'Translation',
  Original: 'Original'
};

exports.NovelStatus = exports.$Enums.NovelStatus = {
  Ongoing: 'Ongoing',
  Completed: 'Completed',
  Paused: 'Paused'
};

exports.Prisma.ModelName = {
  User: 'User',
  RefreshToken: 'RefreshToken',
  NotificationSettings: 'NotificationSettings',
  Author: 'Author',
  Novel: 'Novel',
  Genre: 'Genre',
  Tag: 'Tag',
  TagGroup: 'TagGroup',
  NovelTag: 'NovelTag',
  Chapter: 'Chapter',
  Review: 'Review',
  Comment: 'Comment',
  ReplyComment: 'ReplyComment',
  Reading: 'Reading',
  Favorite: 'Favorite',
  NovelStatistic: 'NovelStatistic',
  ChapterStatistic: 'ChapterStatistic'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
