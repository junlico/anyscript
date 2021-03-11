import { Obj, VRepository } from './Base';

export class Material {
  readonly id: number;
  readonly sortId: number;
  quantity: number;

  constructor(id: number, sortId = 0, quantity = 0) {
    this.id = id;
    this.sortId = sortId;
    this.quantity = quantity;
  }

  updateQuantity(value: number): void {
    this.quantity += value;
  }
}

export class MaterialSortIdRepository extends VRepository<number> {
  constructor() {
    super('MaterialData');
  }

  protected loadEntity(item: Obj<number>): void {
    const { _Id, _SortId } = item;
    this.entities[_Id] = _SortId;
  }

  makeCreateMaterialList(weaponRaw: Obj<number>): Material[] {
    const key = `_CreateEntity`;
    const limit = 5;
    const materialList = this.makeMaterialList(weaponRaw, key, limit);
    materialList.push(new Material(0, 0, weaponRaw._CreateCoin));
    return materialList;
  }

  makeBuildMaterialList(buildRaw: Obj<number>): Material[] {
    const key = `_BuildupMaterial`;
    const limit = 10;
    const materialList = this.makeMaterialList(buildRaw, key, limit);
    materialList.push(new Material(0, 0, buildRaw._BuildupCoin));
    return materialList;
  }

  private makeMaterialList(
    item: Obj<number>,
    key: string,
    limit: number
  ): Material[] {
    const materialList: Material[] = [];

    for (let i = 1; i <= limit; i++) {
      const id = item[`${key}Id${i}`];
      if (!id) break;

      const sortId = this.entities[id];
      const quantity = item[`${key}Quantity${i}`];
      const material = new Material(id, sortId, quantity);
      materialList.push(material);
    }

    return materialList;
  }
}
