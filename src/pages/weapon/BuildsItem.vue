<template>
  <div class="icon-m">
    <div class="relative-outer">
      <img
        class="absolute-inner"
        :src="`/image/weapon-builds/${buildId}.png`"
        alt=""
        draggable="false"
      />
    </div>
    <p class="text-center">{{ labels[buildId] }}</p>
  </div>

  <div class="col">
    <div class="row full-height flex-v-center">
      <div class="col col-mobile-12 flex-h-center">
        <van-stepper
          v-show="isObtained"
          v-model="computedFrom"
          min="0"
          :max="computedTo"
          disable-input
        />
      </div>

      <div class="col col-mobile-12 flex-h-center">
        <van-stepper
          v-model="computedTo"
          :min="computedFrom"
          :max="max"
          disable-input
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'BuildsItem',
  props: {
    buildId: {
      type: String,
      required: true,
    },

    from: {
      type: Number,
      default: 0,
    },

    to: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 0,
    },

    isObtained: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:from', 'update:to'],
  setup(props, { emit }) {
    const labels = {
      1: '上限解锁',
      2: '武器精炼',
      3: '追加插槽',
      5: '种别加成',
      6: '追加持有',
    };

    const computedFrom = computed({
      get: () => props.from,
      set: (value: number): void => {
        emit('update:from', +value);
      },
    });

    const computedTo = computed({
      get: () => props.to,
      set: (value: number): void => {
        emit('update:to', +value);
      },
    });

    return {
      labels,
      computedFrom,
      computedTo,
    };
  },
});
</script>
