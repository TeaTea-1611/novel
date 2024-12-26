import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as models from "./models";

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

export type PropertyDecoratorOverrideFn = (decorators: PropertyDecorator[]) => PropertyDecorator[];

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>
> & { _all?: PropertyDecorator[] };

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    const allFieldsDecorators = enhanceConfig.fields._all ?? [];
    for (const typeFieldName of typeFieldNames) {
      const maybeDecoratorsOrFn = enhanceConfig.fields[
        typeFieldName
      ] as PropertyDecorator[] | PropertyDecoratorOverrideFn | undefined;
      let decorators: PropertyDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allFieldsDecorators);
      } else {
        decorators = [...allFieldsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: ["id", "nickname", "email", "phone", "avatar", "avatarCover", "role", "gender", "introduce", "dob", "urls", "keyNum", "ticketNum", "candyNum", "createdAt", "emailVerified", "isTwoFactorEnable"],
  RefreshToken: ["token", "userId", "tokenFamily", "active", "expiresAt", "createdAt"],
  TwoFactorToken: ["id", "email", "token", "expires"],
  NotificationSettings: ["userId", "newChapter", "newInteraction"],
  Achieve: ["id", "followCnt", "readChapterCnt", "readBookCnt"],
  Asset: ["id", "type", "name", "description", "startDate", "endDate", "title", "url", "color", "isFree"],
  UserAsset: ["id", "userId", "assetId", "receivedAt"],
  Event: ["id", "name", "description", "webPath", "appPath", "startDate", "endDate"],
  EventAsset: ["eventId", "assetId"],
  Author: ["id", "name", "originalName"],
  Book: ["id", "name", "originalName", "authorId", "originalLink", "synopsis", "kind", "gender", "status", "poster", "genreId", "wordCnt", "flowerCnt", "readCnt", "reviewCnt", "chapterCnt", "commentCnt", "points", "createdAt", "newChapterAt", "createdById"],
  Genre: ["id", "name"],
  TagGroup: ["id", "name", "color"],
  Tag: ["id", "groupId", "name"],
  TagOnBook: ["bookId", "tagId"],
  Review: ["id", "userId", "bookId", "point", "content", "isSpoiler", "createdAt"],
  Comment: ["id", "userId", "bookId", "chapterId", "content", "likeCnt", "replyCnt", "createdAt", "updatedAt"],
  ReplyComment: ["id", "userId", "commentId", "content", "likeCnt", "createdAt", "updatedAt"],
  Chapter: ["id", "bookId", "order", "title", "unlockPrice", "readCnt", "publishAt", "createdAt", "updatedAt"],
  BookStatistic: ["id", "bookId", "flower", "read", "comment", "review", "nominate", "date"],
  ChapterStatistic: ["id", "chapterId", "read", "date"],
  Reading: ["userId", "bookId", "currentChapter", "readingAt"],
  Bookmark: ["userId", "bookId", "createdAt"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

