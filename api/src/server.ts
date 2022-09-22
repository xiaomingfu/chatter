import express, { Application, Request, Response } from "express";
import { createApolloServer } from "./graph/server";

export function createExpressApp(): Application {
  const app: Application = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("api server");
  });

  return app;
}

export async function startServer(port: string) {
  const app = createExpressApp();

  const apolloServer = createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log("api server started");
  });
}
