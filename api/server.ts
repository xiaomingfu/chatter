import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 3333;

app.get("/", (req: Request, res: Response) => {
  res.send("api server");
});

app.listen(port, () => {
  console.log("server started");
});
