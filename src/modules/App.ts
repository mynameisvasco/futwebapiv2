import { Items } from "./items/Items";
import { Login } from "./login/Login";
import { Market } from "./market/Market";
import { User } from "./user/User";

export class App {
  private _market: Market;
  private _items: Items;
  private _login: Login;
  private _user: User;

  constructor() {
    this._market = new Market();
    this._items = new Items();
    this._login = new Login();
    this._user = new User();
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
   * Disables web app ability to track user's actions.
   */
  disableMonitoring(): void {
    window.EASFCApp.prototype.onPause = (): any => {};
    window.EASFCApp.prototype.onResume = (): any => {};
    window.services.PIN.isEnabled = () => false;
    window.services.PIN.isEnabledByUser = () => false;
    window.services.PIN.isEnabledByConfig = () => false;
    window.services.PIN.enabled = false;
    window.TelemetryManager.trackEvent = () => {};
    window.TelemetryManager.trackPage = () => {};
  }

  /**
   * Sleep during specified time.
   * @param ms time to sleep in milliseconds
   */
  async sleep(ms: number) {
    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), ms);
    });
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

  /**
   * Gets the user module
   * @returns user instance
   */
  get user(): User {
    return this._user;
  }
}
