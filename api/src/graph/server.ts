import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export interface Context {
  prisma: PrismaClient;
  currentUser: {
    id: string;
  };
}

const prisma = new PrismaClient();

export function createApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    context: ({ req }): Context => {
      return {
        prisma,
        currentUser: {
          id: convertToString(req.headers.token),
        },
      };
    },
  });
  return server;
}

function convertToString(value: string | string[] | null | undefined): string {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value || "";
}
