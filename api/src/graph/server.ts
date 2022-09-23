import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

export interface Context {
  token: string;
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
      const token = req.headers.authorization || "";
      return {
        token,
        prisma,
        currentUser: {
          id: "cl8e0k4zv00002ijltgmynjs3",
        },
      };
    },
  });
  return server;
}
