import { Browser, EvaluateFn, Page, SerializableOrJSHandle } from 'puppeteer';
import Puppeteer, { PuppeteerExtra } from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export class WebApp {
  private _puppeteer: PuppeteerExtra;
  private _browser: Browser;
  private _page: Page;
  private _url = 'https://www.ea.com/en-gb/fifa/ultimate-team/web-app/';
  private _injectorUrl = 'https://a.origin.com/injector.js';

  constructor() {
    this._puppeteer = new PuppeteerExtra(Puppeteer);
    this._puppeteer.use(StealthPlugin());
  }

  async init() {
    this._browser = await this._puppeteer.launch({ headless: false });
    this._page = await this._browser.newPage();
    await this._page.goto(this._url);
  }

  async shutdown() {
    await this._browser.close();
  }

  async exec(fn: EvaluateFn, ...args: SerializableOrJSHandle[]) {
    return await this._page.evaluate(fn, ...args);
  }

  async waitForNavigation() {
    return await this._page.waitForNavigation({ waitUntil: 'networkidle0' });
  }

  async waitForLoad() {
    const xLoginBtn = "(//button[contains(@class, 'call-to-action')])[1]";
    await this._page.waitForXPath(xLoginBtn, { visible: true });
  }

  async waitForLoginFinish() {
    const xLicenseLogo = "(//img[contains(@class, 'licenseLogo')])[1]";
    const xFutWebLoader = "(//img[contains(@class, 'loaderIcon')])[1]";
    await this._page.waitForXPath(xLicenseLogo, { hidden: true });
    await this._page.waitForXPath(xFutWebLoader, { visible: true });
    await this._page.waitForXPath(xFutWebLoader, { hidden: true });
  }

  async inject() {
    this._page.on('load', async () => {
      await this._page.addScriptTag({
        url: this._injectorUrl,
      });
    });
    await this._page.addScriptTag({
      url: this._injectorUrl,
    });
  }
}
