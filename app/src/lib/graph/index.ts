import { ApolloClient, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import { currentUserId } from "../auth";
import { isBrowser } from "../utils/browser";
import inMemoryCache from "./cache";

const API_SERVER = "https://3333-xiaomingfu-chatter-nlqijb7fb0n.ws-us69.gitpod.io/graphql";
const WS_SERVER = "wss://3333-xiaomingfu-chatter-nlqijb7fb0n.ws-us69.gitpod.io/graphql";

// const API_SERVER = "http://localhost:3333/graphql";
// const API_SERVER = "ws://localhost:3333/graphql";

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
      uri: API_SERVER
    })
  );

  // ws only works in browser
  if (!isBrowser()) {
    return httpLink;
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: WS_SERVER,
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
