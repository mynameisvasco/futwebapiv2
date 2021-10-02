import { FutItemPile } from "../../enums/FutItemPile";
import { IUTItemEntity } from "../../interfaces/IUTItemEntity";
import { IUTSearchCriteriaDTO } from "../../interfaces/IUTSearchCriteriaDTO";

export class Items {
  /**
   * Gets IUTItemEntity from a specified resourceId
   * @param resourceId resourceId to search for
   */
  async getData(resourceId: number): Promise<IUTItemEntity> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .getItemDataByDefId([resourceId])
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.item);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Moves a item from one pile to another.
   * @param entity item to move
   * @param pile destination pile
   */
  async move(entity: IUTItemEntity, pile: FutItemPile) {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .move(entity, pile, false)
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(undefined);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Gets all entities present on transfer pile
   * @returns a list of IUTItemEntity
   */
  async getTransferPile(): Promise<IUTItemEntity[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .getTransferPile()
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.items);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Gets all entities present on watch pile
   * @returns a list of IUTItemEntity
   */
  async getWatchPile(): Promise<IUTItemEntity[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .getWatchPile()
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.items);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Gets all entities present on unassigned pile
   * @returns a list of IUTItemEntity
   */
  async getUnassignedPile(): Promise<IUTItemEntity[]> {
    return new Promise((resolve, reject) => {
      window.services.Item.itemDao
        .getUnassignedPile()
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.items);
          else reject(obs.error.code);
        });
    });
  }

  /**
   * Gets all items present in club
   */
  async getClubItems(options: IUTSearchCriteriaDTO): Promise<IUTItemEntity[]> {
    return new Promise((resolve, reject) => {
      window.accessobjects.Club.getClubItems(options).observe(
        undefined,
        (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.items);
          else reject(obs.error.code);
        }
      );
    });
  }
}
