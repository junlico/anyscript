<template>
  <ul class="row">
    <li
      v-for="id in 9"
      :key="id"
      class="p-1"
      role="button"
      @click="$emit('update:modelValue', id)"
    >
      <div
        class="icon-s relative-outer cursor-pointer"
        :class="{ active: id === modelValue }"
      >
        <img
          class="absolute-inner"
          :src="`/image/weapon-types/${id}.png`"
          alt=""
          draggable="false"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PickType',
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
});
</script>
