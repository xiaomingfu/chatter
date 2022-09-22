import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

export function createApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
  });
  return server;
}
