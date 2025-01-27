import { cache } from "@/apollo-client/cache";
import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { cookies } from "next/headers";

const browserCookies = setContext(async () => {
  const cookieStore = await cookies();

  return {
    headers: {
      cookie: `rt=${cookieStore.get("rt")?.value};`,
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: cache,
    link: browserCookies.concat(link),
  });
});
