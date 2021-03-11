<template>
  <div class="row full-height">
    <div class="p-1 col-mobile-12">
      <pick-series v-model="currentSeries"></pick-series>
      <pick-type v-model="currentType"></pick-type>

      <div class="row">
        <ul class="p-h-1">
          <pick-weapon
            v-for="weapon in weaponListByType"
            :key="weapon.Id"
            :class="{ active: weapon.Id === currentWeapon?.Id }"
            :weapon="weapon"
            @set-weapon="setWeapon"
          ></pick-weapon>
        </ul>

        <builds
          :current-weapon="currentWeapon"
          @toggle-modified="toggleModified"
          @toggle-obtained="toggleObtained"
        ></builds>
      </div>
    </div>

    <div class="col">
      <button type="button" @click="toStringify()">SAVE</button>
      <material-list
        :weapon-list-by-series="weaponListBySeries"
        :weapon-list-by-type="weaponListByType"
      ></material-list>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { Weapon, WeaponRepository } from '/@/models';
import PickSeries from './PickSeries.vue';
import PickType from './PickType.vue';
import PickWeapon from './PickWeapon.vue';
import Builds from './Builds.vue';
import MaterialList from './MaterialList.vue';

const weaponRepository = new WeaponRepository();

function useSeries() {
  const SERIES_KEY = 'dragalialost.info/weapon/current-series';
  const currentSeries = ref<number>(+(localStorage.getItem(SERIES_KEY) || 1));

  // save current series to localStorage
  watch(currentSeries, (value) => {
    localStorage.setItem(SERIES_KEY, `${value}`);
  });

  return { currentSeries };
}

export default defineComponent({
  name: 'Weapon',
  components: {
    PickSeries,
    PickType,
    PickWeapon,
    Builds,
    MaterialList,
  },
  async setup() {
    const { currentSeries } = useSeries();
    const currentType = ref<number>(1);
    const currentWeapon = ref<Weapon>();

    const setWeapon = (weapon: Weapon) => {
      currentWeapon.value = weapon;
    };

    const toggleModified = () => {
      if (!currentWeapon.value) return;
      currentWeapon.value.isModified = !currentWeapon.value.isModified;
    };

    const toggleObtained = () => {
      if (!currentWeapon.value) return;
      currentWeapon.value.isObtained = !currentWeapon.value.isObtained;

      if (!currentWeapon.value.isObtained) {
        // clear from value when is not obtained
        for (const weaponBuild of currentWeapon.value.buildList) {
          weaponBuild.from = 0;
        }
      }
    };

    const toStringify = () => {
      weaponRepository.toJSONStringify();
    };

    // clear currentWeapon when series or type changes
    watch([currentSeries, currentType], () => {
      currentWeapon.value = undefined;
    });

    watch(
      [
        () => currentWeapon.value?.buildList?.[0]?.from,
        () => currentWeapon.value?.buildList?.[0]?.to,
      ],
      ([from, to]) => {
        if (from !== undefined && to !== undefined) {
          const item = currentWeapon.value?.buildList?.[1];
          if (item?.id === '2') {
            if (from > 8) {
              item.from = 2;
            } else if (from > 4) {
              item.from = 1;
            } else if (to > 8) {
              item.to = 2;
            } else if (to > 4) {
              item.to = Math.max(item.to, 1);
            }

            item.to = Math.max(item.from, item.to);
          }
        }
      }
    );

    await weaponRepository.loadEntities();

    const weaponList: Weapon[] = reactive(
      weaponRepository.getSortedWeaponList()
    );

    const weaponListBySeries = computed(() =>
      weaponList.filter(
        (weapon: Weapon) => weapon.WeaponSeriesId === currentSeries.value
      )
    );

    const weaponListByType = computed(() =>
      weaponListBySeries.value.filter(
        (weapon: Weapon) => weapon.WeaponType === currentType.value
      )
    );

    return {
      currentSeries,
      currentType,
      currentWeapon,

      weaponListBySeries,
      weaponListByType,

      setWeapon,
      toggleModified,
      toggleObtained,
      toStringify,
    };
  },
});
</script>
