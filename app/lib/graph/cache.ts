import { InMemoryCache } from "@apollo/client";

import { conversationIdVar } from "./local/conversationId";
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
        conversationId: {
          read() {
            return conversationIdVar();
          },
        },
      },
    },
  },
});

export default inMemoryCache;
