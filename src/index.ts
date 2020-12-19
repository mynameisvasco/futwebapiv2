export * from "./interfaces/IPriceRanges";
export * from "./interfaces/IUTAuctionEntity";
export * from "./interfaces/IUTItemEntity";
export * from "./interfaces/IUTStaticPlayerItemDataDTO";

export * from "./modules/App";
export * from "./modules/items/Items";

export * from "./modules/login/Login";
export * from "./modules/login/options/LoginOptions";
export * from "./modules/login/options/SecurityOptions";

export * from "./modules/market/Market";
export * from "./modules/market/options/MarketListOptions";
export * from "./modules/market/options/MarketSearchOptions";

declare global {
  interface Window {
    services: {
      Authentication: any;
      Champions: any;
      Configuration: any;
      Item: any;
      Leaderboards: any;
      Localization: any;
      MTX: any;
      MessageQueue: any;
      Messages: any;
      MyStadium: any;
      Notification: any;
      Objectives: any;
      Onboarding: any;
      PIN: any;
      PlayerHealth: any;
      Rivals: any;
      SBC: any;
      Squad: any;
      SquadBattles: any;
      Store: any;
      URL: any;
      UTUtasRequestQueue: any;
      User: any;
    };
    EASFCApp: any;
    gConfigurationModel: any;
  }
}
