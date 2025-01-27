import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { accessTokenVar } from "./vars/access-token-var";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return accessTokenVar();
          },
        },
      },
    },
  },
});
