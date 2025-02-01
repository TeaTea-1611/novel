import { PrismaClient, prisma, type User } from "@workspace/db";
import { type Request, type Response } from "express";
import { type Redis } from "ioredis";
import { accessTokenManager } from "./shared/utils/jwt";
import { redis } from "./redis";
import { buildDataLoaders } from "./shared/utils/dataloader";

export interface Context {
  req: Request;
  res: Response;
  user: User | null;
  prisma: PrismaClient;
  redis: Redis;
  dataLoaders: ReturnType<typeof buildDataLoaders>;
}

export const createContext = async (
  req: Request,
  res: Response,
): Promise<Context> => {
  const token = req.headers.authorization?.split(" ")[1] || null;

  let user: User | null = null;

  if (token) {
    const decoded = accessTokenManager.verify(token);
    if (decoded?.sub) {
      user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    }
  }

  return {
    req,
    res,
    user,
    prisma,
    redis,
    dataLoaders: buildDataLoaders(prisma),
  };
};
