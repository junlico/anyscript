<template>
  <div v-show="currentWeapon" class="col">
    <div class="flex-h-between">
      <div class="p-h-1">
        <input id="is-obtained" v-model="isObtained" type="checkbox" />
        <label for="is-obtained" class="p-v-1 p-h-2">持有</label>
      </div>

      <button class="p-h-3" @click="$emit('toggle-modified')">添加</button>
    </div>

    <ul>
      <li
        v-for="weaponBuild in currentWeapon?.buildList"
        :key="weaponBuild.id"
        class="row"
      >
        <builds-item
          v-model:from="weaponBuild.from"
          v-model:to="weaponBuild.to"
          :build-id="weaponBuild.id"
          :max="weaponBuild.max"
          :is-obtained="isObtained"
        ></builds-item>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Weapon } from '/@/models';
import BuildsItem from './BuildsItem.vue';

export default defineComponent({
  name: 'Builds',
  components: {
    BuildsItem,
  },
  props: {
    currentWeapon: {
      type: Object as PropType<Weapon>,
      default: () => undefined,
    },
  },
  emits: ['toggle-modified', 'toggle-obtained'],
  setup(props, { emit }) {
    const isObtained = computed({
      get: () => props.currentWeapon?.isObtained,
      set: (value) => {
        emit('toggle-obtained', value);
      },
    });

    return {
      isObtained,
    };
  },
});
</script>
