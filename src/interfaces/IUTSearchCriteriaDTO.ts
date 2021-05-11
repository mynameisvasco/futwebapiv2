export interface IUTSearchCriteriaDTO {
  club: number;
  count: number;
  defId: number[];
  excludeDefIds: number[];
  isExactSearch: boolean;
  league: number;
  level: "gold" | "silver" | "bronze" | "special" | "any";
  maskedDefId: number;
  maxBid: number;
  maxBuy: number;
  minBid: number;
  minBuy: number;
  nation: number;
  offset: number;
  playStyle: number;
  rarities: number[];
  sortBy: string;
  subtypes: any[];
  acquiredDate: string;
  _category: string;
  _position: string;
  _sort: string;
  _type: "player" | "staff" | "clubItem" | "training";
  _untradeables: string;
  _zone: number;

  category(): string;
  className(): string;
  position(): string;
  sort(): string;
  superclass(): string;
  type(): string;
  untradeables(): string;
  zone(): number;
}
