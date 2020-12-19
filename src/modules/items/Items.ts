import { IUTItemEntity } from "../../interfaces/IUTItemEntity";

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
          else reject();
        });
    });
  }
}
