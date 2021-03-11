<template>
  <header class="flex-v-center">I'm the Header</header>
</template>

<script lang="ts">
import Axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';

async function fetcher(file: string) {
  try {
    const { data } = await Axios.get(`/json/${file}.json`);
    return data;
  } catch {
    console.error(`Failed to load file: ${file}`);
    return {};
  }
}

class Weapon {
  constructor(public _Id: number, public _Rarity: number) {}

  getId() {
    return this._Id;
  }
}

function decodeWeapon(item: Record<string, string | number>): Weapon {
  const weapon = Object.create(Weapon.prototype);
  return Object.assign(weapon, item);
}

export default defineComponent({
  name: 'App',
  // components: { Weapon },
  setup() {
    const raw = ref();
    onMounted(async () => {
      const data = await fetcher(`WeaponBody`);
      const entities: Record<string, Weapon> = {};
      for (const key in data) {
        const item = data[key];

        const weapon = decodeWeapon(item);
        entities[key] = weapon;
      }
      raw.value = entities;
    });

    return {
      raw,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  height: 50px;
}

main {
  height: calc(100% - 50px);
}
</style>
