<template>
  <div class="dropdown">
    <input
      id="picked-series"
      v-model="isOpen"
      class="display-none dropdown-ctrl"
      type="checkbox"
    />

    <label
      class="relative-outer weapon-series-banner cursor-pointer"
      for="picked-series"
    >
      <img
        class="absolute-inner"
        :src="`/image/weapon-series/${modelValue}.png`"
        alt=""
        draggable="false"
      />
    </label>

    <label class="dropdown-close" for="picked-series"></label>

    <ul class="dropdown-menu">
      <li
        v-for="id in series"
        :key="id"
        class="m-n-1"
        role="button"
        @click="
          $emit('update:modelValue', id);
          isOpen = false;
        "
      >
        <div class="p-h-1" :class="{ active: id === modelValue }">
          <div class="relative-outer weapon-series-banner cursor-pointer">
            <img
              class="absolute-inner"
              :src="`/image/weapon-series/${id}.png`"
              alt=""
              draggable="false"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PickSeries',
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const series: number[] = [1, 2, 5, 3, 4, 6];
    const isOpen = ref(false);

    return {
      series,
      isOpen,
    };
  },
});
</script>
