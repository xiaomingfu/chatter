import { InMemoryCache } from "@apollo/client";

import { searchInputVar } from "./local/searchInput";

const inMemoryCache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchInput: {
          read() {
            return searchInputVar();
          },
        },
      },
    },
  },
});

export default inMemoryCache;
