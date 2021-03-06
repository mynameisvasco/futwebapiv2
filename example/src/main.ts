import Express, { json, Request, Response } from "express";
import * as Fs from "fs";
import * as Path from "path";
import * as Https from "https";
import { WebApp } from "./WebApp";
import { App } from "../../src/index";

declare global {
  interface Window {
    api: App;
  }
}

const webApp = new WebApp();
const express = Express();
express.use(json());

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

express.post("/login", async (req: Request, res: Response) => {
  const { email, password, token2fa } = req.body;
  await webApp.init();
  await webApp.waitForLoad();
  await webApp.inject();
  await webApp.exec(() => window.api.login.open());
  await webApp.waitForNavigation();
  await webApp.exec(
    (email, password) => window.api.login.login({ email, password }),
    email,
    password
  );
  await webApp.waitForNavigation();
  await webApp.exec(() => window.api.login.selectSecurity("APP"));
  await webApp.waitForNavigation();
  await webApp.exec(
    (token2fa) => window.api.login.security({ code2fa: token2fa }),
    token2fa
  );
  await webApp.waitForLoginFinish();
  const canUseAccount = (await webApp.exec(() => {
    const canUseMarket = window.api.user.canUseMarket();
    const hasClub = window.api.user.hasClub();
    return canUseMarket && hasClub;
  })) as boolean;
  console.log(canUseAccount);
});

const server = Https.createServer(options, express);

async function bootstrap() {
  server.listen(443, () => console.log("Server running on 443"));
}

bootstrap();
