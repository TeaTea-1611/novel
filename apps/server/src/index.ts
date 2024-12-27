import "reflect-metadata";
import express from "express";
import http from "http";
import { buildSchema, GraphQLTimestamp } from "type-graphql";
import { ErrorLoggerMiddleware } from "./shared/middlewares/error-logger.middleware";
import Container from "typedi";
import { ApolloServer } from "@apollo/server";
import { createContext, type Context } from "./context";
import { authChecker } from "./auth-checker";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import * as path from "path";
import cookieParser from "cookie-parser";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { env } from "./env";
import { resolvers } from "./resolvers";

(async () => {
  const app = express();
  const port = 4000;
  const httpServer = http.createServer(app);

  app.use(cookieParser());

  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: {
      path: "src/schema.graphql",
      sortedSchema: false,
    },
    globalMiddlewares: [ErrorLoggerMiddleware],
    scalarsMap: [{ type: Date, scalar: GraphQLTimestamp }],
    authChecker,
    container: Container,
    validate: false,
  });

  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: "my-graph-id@my-graph-variant",
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      // ApolloServerPluginCacheControl(), responseCachePlugin()
    ],
    // cache: new KeyvAdapter(new Keyv({ store: new KeyvRedis(redis) })),
  });

  await server.start();

  app.use(express.static(path.join(import.meta.dir, "../public")));

  app.use(
    env.GRAPHQL_PATH,
    cors<cors.CorsRequest>({
      origin: [env.WEB_URL!, "http://localhost:3001"],
      credentials: true,
    }),
    express.json(),
    graphqlUploadExpress({
      maxFileSize: env.GRAPHQL_UPLOAD_MAX_FILE_SIZE,
      maxFiles: env.GRAPHQL_UPLOAD_MAX_FILES,
    }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return await createContext(req, res);
      },
    }),
  );

  httpServer.listen({ port }, () => {
    const protocol = env.NODE_ENV === "production" ? "https" : "http";
    const host = env.HOST;
    console.log(
      `🚀 Server ready at ${protocol}://${host}:${port}${env.GRAPHQL_PATH}`,
    );
  });
})()
  .then()
  .catch();
