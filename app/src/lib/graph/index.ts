import { ApolloClient, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import { currentUserId } from "../auth";
import { isBrowser } from "../utils/browser";
import inMemoryCache from "./cache";

function createLink() {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        token: currentUserId,
      },
    };
  });

  const httpLink = authLink.concat(
    createHttpLink({
      uri: "http://localhost:3333/graphql",
    })
  );

  // ws only works in browser
  if (!isBrowser()) {
    return httpLink;
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:3333/graphql",
      connectionParams: {
        token: currentUserId,
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return splitLink;
}

export const apolloClient = new ApolloClient({
  link: createLink(),
  cache: inMemoryCache,
});
