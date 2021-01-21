export class MarketSearchOptions {
  club: number = -1;
  count: number = 100;
  defId: number[] = [];
  excludeDefIds: number[] = [];
  isExactSearch: boolean = false;
  league: number = -1;
  level: "gold" | "silver" | "bronze" | "special" | "any" = "any";
  maskedDefId: number = 0;
  maxBid: number = 0;
  maxBuy: number = 0;
  minBid: number = 0;
  minBuy: number = 0;
  nation: number = -1;
  offset: number = 0;
  playStyle: number = -1;
  rarities: number[] = [];
  sortBy: string = "value"; //Not figured out how it works
  subtypes: any[] = []; //Not figured out how it works
  _acquiredDate: string = ""; //Not figured out how it works
  _category: string = "any";
  _position: string = "any";
  _sort: string = "desc"; //Not figured out how it works
  _type: "player" | "staff" | "clubItem" | "training" = "player";
  _untradeables: string = ""; //Not figured out how it works
  zone: number = -1; // Available options: {DEFENSE: 130, MIDFIELD: 131, ATTACKER: 132} (source: window.enums.PlayerZonesAsInts)
}
