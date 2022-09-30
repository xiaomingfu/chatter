import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

import { createApolloServer } from "./graph/server";

function createExpressApp(): Application {
  const app: Application = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("api server");
  });

  return app;
}

export function createWsServer(httpServer: any): any {
  return new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
}

export async function startServer(port: string) {
  const app = createExpressApp();
  const httpServer = createServer(app);
  const wsServer = createWsServer(httpServer);

  const apolloServer = createApolloServer(httpServer, wsServer);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen(port, () => {
    console.log("api server started");
  });
}
