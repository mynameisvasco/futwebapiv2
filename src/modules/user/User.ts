import { IUTUserEntity } from "../../interfaces/IUTUserEntity";

export class User {
  /**
   * Gets user's entity details
   */
  getUser() {
    return window.services.User.getUser() as IUTUserEntity;
  }

  /**
   * Gets user's coins amount.
   */
  async getCoins(): Promise<number> {
    return new Promise((resolve, reject) => {
      window.services.User.requestCurrencies().observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(obs.data.coins.amount);
          else reject(obs.status);
        }
      );
    });
  }

  /**
   * Gets user's fifa points amount
   */
  async getPoints(): Promise<number> {
    return new Promise((resolve, reject) => {
      window.services.User.requestCurrencies().observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(obs.data.points.amount);
          else reject(obs.status);
        }
      );
    });
  }

  /**
   * Gets user's draf tokens amount
   */
  async getDraftTokens(): Promise<number> {
    return new Promise((resolve, reject) => {
      window.services.User.requestCurrencies().observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(obs.data.tokens.amount);
          else reject(obs.status);
        }
      );
    });
  }

  /**
   * Returns ability of user to use the transfer market.
   * @returns true if user can use market, otherwise false
   */
  canUseMarket(): boolean {
    return this.getUser().hasTradeAccess();
  }

  /**
   * Returns if user gas club or not
   * @returns true if user has a club, otherwise false
   */
  hasClub() {
    return this.getUser().selectedPersona !== 0;
  }
}
