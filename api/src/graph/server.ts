import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export interface Context {
  prisma: PrismaClient;
  /**
   * In memory pubsub that's only used for this server instance.
   */
  pubsub: PubSub;
  currentUser: {
    id: string;
  };
}

const prisma = new PrismaClient();
const pubsub = new PubSub();

const context = ({ req }: ExpressContext): Context => {
  return {
    prisma,
    pubsub,
    currentUser: {
      id: convertToString(req.headers.token || "cl8fi0scw0020gdjluxe0luch"),
    },
  };
};

export function createApolloServer(httpServer: any, wsServer: any) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        // ctx is the graphql-ws context

        const token =
          ctx.connectionParams?.token || "cl8fi0scw0020gdjluxe0luch";

        return {
          prisma,
          pubsub,
          currentUser: {
            id: convertToString(token as string | string[] | null | undefined),
          },
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    context,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  return server;
}

function convertToString(value: string | string[] | null | undefined): string {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value || "";
}
