import { Browser, Page } from "puppeteer";
import Puppeteer, { PuppeteerExtra } from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export class WebApp {
  private _puppeteer: PuppeteerExtra;
  private _browser: Browser;
  private _page: Page;
  private _url = "https://www.ea.com/en-gb/fifa/ultimate-team/web-app/";
  private _injectorUrl = "https://a.origin.com/injector.js";
  private _isInjected: boolean;

  constructor() {
    this._puppeteer = new PuppeteerExtra(Puppeteer);
    this._puppeteer.use(StealthPlugin());
  }

  async init() {
    this._browser = await this._puppeteer.launch({ headless: false });
    this._page = await this._browser.newPage();
    await this._page.goto(this._url);
    return new Promise((resolve) => {
      const i = setInterval(async () => {
        const isLoginReady = (await this._page.evaluate(
          () => document.getElementsByClassName("call-to-action").length !== 0
        )) as boolean;
        if (isLoginReady) {
          resolve(undefined);
          this._inject();
          clearInterval(i);
        }
      }, 500);
    });
  }

  async shutdown() {
    await this._browser.close();
  }

  private async _inject() {
    if (!this.isInjected) {
      await this._page.evaluate((injectorUrl) => {
        var script = document.createElement("script");
        script.src = injectorUrl;
        document.getElementsByTagName("head")[0].appendChild(script);
      }, this._injectorUrl);
      return new Promise((resolve) => {
        setTimeout(() => {
          this._isInjected = true;
          resolve(undefined);
        }, 1000);
      });
    }
  }

  get isInjected() {
    return this._isInjected;
  }
}
