import { Obj, VRepository } from './Base';
import { Material, MaterialSortIdRepository } from './Material';

// interface OptionProp {
//   from?: number;
//   to?: number;
//   max?: number;
// }

// export class WeaponBuild {
//   id: string;
//   list: Material[][];
//   from: number;
//   to: number;
//   max: number;

//   constructor(
//     id: string,
//     list: Material[][] = [],
//     { from = 0, to = 0, max = 0 }: OptionProp
//   ) {
//     this.id = id;
//     this.list = list;
//     this.from = from;
//     this.to = to;
//     this.max = max;
//   }
// }

export class WeaponBuild {
  from = 0;
  to = 0;
  max: number;

  list: Material[][];

  constructor(list: Material[][]) {
    this.list = list;
    this.max = list.length;
  }
}

export class WeaponBuildRepository extends VRepository<
  Record<string, WeaponBuild>
> {
  private sortIdRepository: MaterialSortIdRepository;

  constructor(sortIdRepository: MaterialSortIdRepository) {
    super('WeaponBodyBuildupGroup');
    this.sortIdRepository = sortIdRepository;
  }

  protected isValid(item: Obj<number>): boolean {
    return !!item._Id;
  }

  protected loadEntity(item: Obj<number>): void {
    const {
      _WeaponBodyBuildupGroupId: groupId,
      _BuildupPieceType: buildId,
    } = item;

    const builds = this.entities[groupId] || {};
    const weaponBuild = builds[buildId] || new WeaponBuild([]);
    weaponBuild.list.push(this.sortIdRepository.makeBuildMaterialList(item));
    this.entities[groupId] = builds;

    // let weaponBuild = this.entities[groupId];

    // if (!weaponBuild) {
    //   weaponBuild = {};
    //   this.entities[groupId] = weaponBuild;
    // }

    // let pieceList = weaponBuild[pieceId];

    // if (!pieceList) {
    //   pieceList = [];
    //   weaponBuild[pieceId] = pieceList;
    // }

    // pieceList.push(this.sortIdRepository.makeBuildMaterialList(item));
  }
}

/**
1100: {
  1: [
    [Material, Material],
    [Material, Material]
    [Material, Material]
  ],
  2: [
    [Material, Material],
    [Material, Material],
    [Material, Material]
  ]
}
*/
