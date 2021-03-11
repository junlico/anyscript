<template>
  <div>
    <button
      class="btn"
      :class="{ disabled: decDisabled }"
      type="button"
      @click="onClick($event, -step)"
    >
      -
    </button>

    <span>{{ modelValue }}</span>

    <button
      class="btn"
      :class="{ disabled: incDisabled }"
      type="button"
      @click="onClick($event, step)"
    >
      +
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Stepper',
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },

    min: {
      type: [Number, String],
      default: 0,
    },

    max: {
      type: [Number, String],
      default: Infinity,
    },

    step: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onClick = (event: MouseEvent, step: number) => {
      event.preventDefault();

      const min = +props.min;
      const max = +props.max;
      let value = +props.modelValue + step;

      value = Number.isNaN(value) ? min : value;
      value = Math.max(Math.min(value, max), min);

      emit('update:modelValue', value);
    };

    const decDisabled = computed(() => +props.modelValue <= +props.min);
    const incDisabled = computed(() => +props.modelValue >= +props.max);

    return {
      onClick,
      decDisabled,
      incDisabled,
    };
  },
});
</script>
