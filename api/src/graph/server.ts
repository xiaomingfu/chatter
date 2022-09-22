import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

export interface Context {
  token: string;
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

export function createApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    context: ({ req }): Context => {
      const token = req.headers.authorization || "";
      return { token, prisma };
    },
  });
  return server;
}
