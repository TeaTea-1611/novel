import { PrismaClient } from "@prisma/client";
import { type Request, type Response } from "express";
import { type Redis } from "ioredis";
import { User } from "./generated/type-graphql";
import { verifyAccessToken } from "./utils/tokens";
import { redis } from "./redis";
import { buildDataLoaders } from "./utils";

const prisma = new PrismaClient({
  // log: ["query"],
});

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
    const decoded = verifyAccessToken(token);
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
