export interface IUTAuctionEntity {
  buyNowPrice: number;
  currentBid: number;
  expires: number;
  isUpdating: boolean;
  stale: boolean;
  startingBid: number;
  timestamp: number;
  tradeId: string;
  tradeOwner: boolean;
  _bidState: string;
  _tradeState: string;
  _watched: boolean;
}
