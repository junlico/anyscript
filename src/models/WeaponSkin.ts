import { V, Obj, VRepository } from './Base';

export class WeaponSkinRepository extends VRepository<string> {
  constructor() {
    super('WeaponSkin');
  }

  protected loadEntity(item: Obj<V>): void {
    const { _Id, _BaseId, _FormId } = item;
    this.entities[_Id] = `${_BaseId}_01_${_FormId}`;
  }
}
