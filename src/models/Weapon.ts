import { V, Obj, VRepository } from './Base';
import { Material, MaterialSortIdRepository } from './Material';
import { WeaponBuild, WeaponBuildRepository } from './WeaponBuild';

import { WeaponSkinRepository } from './WeaponSkin';

export class Weapon {
  isModified = false;
  isObtained = false;
  createMaterialList: Material[] = [];
  builds: Record<string, WeaponBuild> = {};
  weaponSkin = '';

  readonly Id;
  readonly Rarity;
  readonly ElementalType;
  readonly WeaponSeriesId;
  readonly WeaponType;

  constructor(item: Obj<number>) {
    this.Id = item._Id;
    this.Rarity = item._Rarity;
    this.ElementalType = item._ElementalType;
    this.WeaponSeriesId = item._WeaponSeriesId;
    this.WeaponType = item._WeaponType;
    // this.WeaponPassiveAbilityGroupId = item._WeaponPassiveAbilityGroupId;
  }
}

export class WeaponRepository extends VRepository<Weapon> {
  private sortIdRepository = new MaterialSortIdRepository();
  private buildRepository = new WeaponBuildRepository(this.sortIdRepository);
  private skinRepository = new WeaponSkinRepository();

  private weaponBuildDefault: { [key: string]: number } = {
    // 上限解锁
    '1': 5,
    // 武器精炼
    '2': 1,
    // 追加插槽
    '3': 0,
    // 种别加成
    '5': 1,
    // 追加持有
    '6': 0,
  };

  constructor() {
    super('WeaponBody');
  }

  async loadEntities(): Promise<void> {
    await this.sortIdRepository.loadEntities();
    await this.buildRepository.loadEntities();
    await this.skinRepository.loadEntities();
    await super.loadEntities();

    this.sortIdRepository.clearEntities();
    this.buildRepository.clearEntities();
    this.skinRepository.clearEntities();
  }

  getSortedWeaponList(): Weapon[] {
    return Object.values(this.entities).sort((a: Weapon, b: Weapon) => {
      return (
        a.WeaponSeriesId - b.WeaponSeriesId ||
        a.WeaponType - b.WeaponType ||
        b.Rarity - a.Rarity ||
        a.ElementalType - b.ElementalType
      );
    });
  }

  toJSONStringify(): string {
    for (const key in this.entities) {
      if (Object.prototype.hasOwnProperty.call(this.entities, key)) {
        const weapon = this.entities[key];

        if (weapon.isModified) {
          console.log(weapon);
        }
      }
    }

    return '';
  }

  protected isValid(item: Obj<V>): boolean {
    return !!item._Name && item._Rarity > 1;
  }

  protected loadEntity(item: Obj<number>): void {
    const weapon = new Weapon(item);
    this.setWeaponBuild(weapon, item);
    weapon.createMaterialList = this.sortIdRepository.makeCreateMaterialList(
      item
    );

    weapon.weaponSkin = this.skinRepository.getEntity(item._WeaponSkinId) || '';

    this.entities[weapon.Id] = weapon;
  }

  private setWeaponBuild(weapon: Weapon, item: Obj<number>): void {
    const { _WeaponBodyBuildupGroupId: groupId } = item;
    const builds = this.buildRepository.getEntity(groupId);

    for (const key in builds) {
      const weaponBuild = builds[key];


      // const
      // const
    }

    // const buildList: WeaponBuild[] = [];
    // for (const [id, list] of Object.entries(builds)) {
    //   const max = list.length;
    //   const to = Math.min(max, this.weaponBuildDefault[id] || 0);
    //   buildList.push(new WeaponBuild(id, list, { to, max }));
    // }

    // weapon.buildList = buildList;
  }
}
