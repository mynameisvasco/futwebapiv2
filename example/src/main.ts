import Express, { Request, Response } from "express";
import * as Fs from "fs";
import * as Path from "path";
import * as Https from "https";
import { WebApp } from "./WebApp";

const express = Express();

var options = {
  key: Fs.readFileSync("app.key"),
  cert: Fs.readFileSync("app.crt"),
  port: 443,
};

express.get("/injector.js", (req: Request, res: Response) => {
  return res.send(
    Fs.readFileSync(Path.resolve("build/injector.js"), { encoding: "utf-8" })
  );
});

const server = Https.createServer(options, express);

async function bootstrap() {
  server.listen(443, () => console.log("Server running on 443"));
  const webApp = new WebApp();
  await webApp.init();
}

bootstrap();
