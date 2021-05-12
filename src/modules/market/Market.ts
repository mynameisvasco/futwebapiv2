import { IPriceRanges } from "../../interfaces/IPriceRanges";
import { IUTItemEntity } from "../../interfaces/IUTItemEntity";
import { IUTSearchCriteriaDTO } from "../../interfaces/IUTSearchCriteriaDTO";
import { IUTListItemDTO } from "../../interfaces/IUTListItemDTO";

export class Market {
  /**
   * Disables market cache
   */
  disableCache(): void {
    window.services.Item.marketRepository.isCacheExpired = () => true;
  }

  /**
   * Sets the number of items that are displayed per page on market search
   * @param v the number of items per page
   */
  setItemsPerPage(v: number): void {
    window.gConfigurationModel._dataObject.itemsPerPage.transferMarket = v;
  }

  /**
   * Performs a market search using specified options
   * @param options search options
   * @returns a list of IUTItemEntity
   */
  async searchTransferMarket(
    options: IUTSearchCriteriaDTO
  ): Promise<IUTItemEntity[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .searchTransferMarket(options, 1)
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.items);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Relists all expired entities present in the transfer pile.
   * @returns a list of auctionIds.
   */
  async relistExpiredAuctions(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .relistExpiredAuctions()
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.data?.auctionIds);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Lists an entity in the market using specified options
   * @param options list item options
   * @returns a list of auctionIds
   */
  async list(options: IUTListItemDTO): Promise<number[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.list(
        options.entity,
        options.startingBid,
        options.buyNowPrice,
        options.duration
      ).observe(undefined, (_: any, obs: any) => {
        if (obs.success) resolve(obs.data?.itemIds);
        else reject(obs.error.code);
      });
    });
  }

  /**
   * Performs a bid on a specified player
   * @param entity item that is going to be bidded
   * @param coins amount of coins to bid
   * @returns a list of entity ids
   */
  async bid(entity: IUTItemEntity, coins: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.bid(entity, coins).observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(obs.data?.itemIds);
          else reject(obs.error.code);
        }
      );
    });
  }

  /**
   * Clears sold items from transfer pile
   * @returns a list of itemsIds that were cleared.
   */
  async clearSold(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.services.Item.clearSoldItems().observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(obs.data?.itemIds);
          else reject(obs.error.code);
        }
      );
    });
  }

  /**
   * Gets price ranges for specified resource ids
   * @param resourceIds resource ids of the entities
   */
  async getPriceRanges(resourceIds: number[]): Promise<IPriceRanges[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .getItemMarketDataByDefId(resourceIds)
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success)
            resolve(
              obs.response.marketData.map((item: any) => {
                return {
                  resourceId: item.defId,
                  minimum: item.priceLimits.minimum,
                  maximum: item.priceLimits.maximum,
                } as IPriceRanges;
              })
            );
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Refreshes auction info of specefied entities.
   * @param entities used to retrive auction info
   */
  async refreshAuction(entities: IUTItemEntity[]) {
    return new Promise((resolve, reject) => {
      window.services.Item.refreshAuctions(entities, false).observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(undefined);
          else reject(obs.error.code);
        }
      );
    });
  }
}
