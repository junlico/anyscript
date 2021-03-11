<template>
  <li
    class="icon-l relative-outer cursor-pointer"
    :class="{ modified: weapon.isModified }"
    role="button"
    @click="$emit('set-weapon', weapon)"
  >
    <img
      class="absolute-inner"
      :src="`/image/weapon/${weapon.weaponSkin}.png`"
      alt=""
      draggable="false"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Weapon } from '/@/models';

export default defineComponent({
  name: 'PickWeapon',
  props: {
    weapon: {
      type: Object as PropType<Weapon>,
      required: true,
    },
  },
  emits: ['set-weapon'],
});
</script>
