import { IUTUserEntity } from "../../interfaces/IUTUserEntity";

export class User {
  getUser() {
    return window.services.User.getUser() as IUTUserEntity;
  }

  async getCoins() {
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

  async getPoints() {
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

  async getDraftTokens() {
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
