import { Items } from "./items/Items";
import { Login } from "./login/Login";
import { Market } from "./market/Market";

export class App {
  private _market?: Market;
  private _items?: Items;
  private _login: Login;

  constructor() {
    this._market = new Market();
    this._items = new Items();
    this._login = new Login();
  }

  /**
   * Restores the console object
   */
  restoreConsole(): void {
    var i = document.createElement("iframe") as any;
    i.style.display = "none";
    document.body.appendChild(i);
    window.console = i.contentWindow.console;
  }

  /**
   * Disables web app ability to track browser tab.
   */
  disableMonitoring(): void {
    (window as any).EASFCApp.prototype.onPause = (): any => undefined;
    (window as any).EASFCApp.prototype.onResume = (): any => undefined;
  }

  /**
   * Gets the Market module
   * @returns market instance
   */
  get market(): Market {
    return this._market;
  }

  /**
   * Gets the Items module
   * @returns items instance
   */
  get items(): Items {
    return this._items;
  }

  /**
   * Gets the Login module
   * @returns login instance
   */
  get login(): Login {
    return this._login;
  }
}
