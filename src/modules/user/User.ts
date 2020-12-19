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
          else reject();
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
          else reject();
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
          else reject();
        }
      );
    });
  }
}
