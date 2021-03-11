<template>
  <div>
    <input id="is-enabled" v-model="isEnabled" type="checkbox" />
    <label class="p-v-1 p-h-2" for="is-enabled">View All Types</label>
  </div>
  <div v-show="coin" class="flex-v-center">
    <div class="icon-m m-h-1">
      <div class="relative-outer">
        <img
          src="/image/material/0.png"
          alt=""
          class="absolute-inner"
          draggable="false"
        />
      </div>
    </div>
    <p class="p-h-2">{{ coin.toLocaleString() }}</p>
  </div>
  <div class="overflow-auto p-h-1">
    <ul class="row">
      <li v-for="material in materialList" :key="material.id" class="p-1">
        <div class="relative-outer icon-m m-auto">
          <img
            :src="`/image/material/${material.id}.png`"
            alt=""
            class="absolute-inner"
            draggable="false"
          />
        </div>

        <p class="text-center">
          {{ material.quantity.toLocaleString() }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { Weapon, Material } from '/@/models';

type MaterialID = number;
type State = Record<MaterialID, Material>;

function sumMaterial(state: State, materialList: Material[]): void {
  for (const raw of materialList) {
    const material = state[raw.id] || new Material(raw.id, raw.sortId);
    material.updateQuantity(raw.quantity);
    state[material.id] = material;
  }
}

function calcCreate(state: State, weapon: Weapon): void {
  if (!weapon.isModified || weapon.isObtained) return;
  sumMaterial(state, weapon.createMaterialList);
}

function calcBuild(state: State, weapon: Weapon): void {
  if (!weapon.isModified) return;
  for (const weaponBuild of weapon.buildList) {
    const from = weaponBuild.from;
    const to = weaponBuild.to;

    if (from === to) continue;

    const list: Material[][] = weaponBuild.list.slice(from, to);

    for (const materialList of list) {
      sumMaterial(state, materialList);
    }
  }
}

export default defineComponent({
  name: 'MaterialList',
  props: {
    weaponListBySeries: {
      type: Array as PropType<Weapon[]>,
      default: () => [],
    },

    weaponListByType: {
      type: Array as PropType<Weapon[]>,
      default: () => [],
    },
  },
  setup(props) {
    const isEnabled = ref<boolean>(true);

    const weaponList = computed(() =>
      isEnabled.value ? props.weaponListBySeries : props.weaponListByType
    );

    const coin = ref<number>(0);
    const materialList = computed<Material[]>(() => {
      const state: State = {};

      for (const weapon of weaponList.value) {
        calcCreate(state, weapon);
        calcBuild(state, weapon);
      }

      const list = Object.values(state).sort((a, b) => a.sortId - b.sortId);
      coin.value = list[0]?.quantity || 0;
      list.splice(0, 1);
      return list;
    });

    return {
      isEnabled,
      coin,
      materialList,
    };
  },
});
</script>
