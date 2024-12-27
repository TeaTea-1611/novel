"use client";

import { cache } from "@/apollo-client/cache";
import { accessTokenVar } from "@/apollo-client/vars/access-token-var";
import {
  RefreshTokenDocument,
  RefreshTokenMutation,
} from "@/apollo-client/__generated";
import { ApolloLink, fromPromise, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloNextAppProvider,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { createUploadLink } from "apollo-upload-client";
import { toast } from "sonner";
import * as React from "react";

const refreshAccessToken = async (
  client: ApolloClient<unknown>,
): Promise<string | null> => {
  try {
    const { data } = await client.mutate<RefreshTokenMutation>({
      mutation: RefreshTokenDocument,
    });
    if (data?.refreshToken) {
      return data.refreshToken;
    }
    return null;
  } catch {
    return null;
  }
};

function makeClient() {
  let refreshTokenPromise: Promise<string | null> | null = null;

  const httpLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = accessTokenVar();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Apollo-Require-Preflight": "true",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          switch (err.extensions?.code) {
            case "UNAUTHENTICATED": {
              const client = makeClient();

              if (!refreshTokenPromise) {
                refreshTokenPromise = refreshAccessToken(client);
                refreshTokenPromise
                  .then((res) => {
                    if (!res) {
                      accessTokenVar(null);
                      client.cache.modify({
                        fields: {
                          me() {
                            return null;
                          },
                        },
                      });
                    }
                  })
                  .finally(() => {
                    refreshTokenPromise = null;
                  });
              }

              return fromPromise(refreshTokenPromise)
                .filter((value) => {
                  if (!value) {
                    Observable.of();
                  }
                  return true;
                })
                .flatMap((newAccessToken) => {
                  if (typeof newAccessToken === "string") {
                    accessTokenVar(newAccessToken);

                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${newAccessToken}`,
                      },
                    });
                  }
                  return forward(operation);
                });
            }
            case "FORBIDDEN": {
              toast.error(err.message);
              break;
            }
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        toast.error(`[Lỗi network]`);
      }
    },
  );

  const link =
    typeof window === "undefined"
      ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
      : ApolloLink.from([authLink, errorLink, httpLink]);

  return new ApolloClient({
    cache,
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
