import { IUTItemEntity } from "../../interfaces/IUTItemEntity";

export class Items {
  private _itemService: any;

  constructor() {
    this._itemService = (window as any).services.Item;
  }

  /**
   * Gets IUTItemEntity from a specified resourceId
   * @param resourceId resourceId to search for
   */
  async getData(resourceId: number): Promise<IUTItemEntity> {
    return new Promise((resolve, reject) => {
      this._itemService.itemDao
        .getItemDataByDefId([resourceId])
        .observe(undefined, (_: any, obs: any) => {
          if (obs.success) resolve(obs.response.item);
          else reject();
        });
    });
  }
}
