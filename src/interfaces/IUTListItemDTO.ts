import { IUTItemEntity } from "./IUTItemEntity";

export interface IUTListItemDTO {
  entity: IUTItemEntity;
  startingBid: number;
  buyNowPrice: number;
  duration: number;
}
