import { ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { currentUserId } from "../auth";
import inMemoryCache from "./cache";

const httpLink = createHttpLink({
  uri: "http://localhost:3333/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = currentUserId;
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: inMemoryCache,
});
