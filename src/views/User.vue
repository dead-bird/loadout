<script>
import InventoryImage from '@/components/InventoryImage';
import axios from 'axios';

export default {
  components: { InventoryImage },

  data: () => ({
    inventory: []
  }),

  methods: {
    category(item, name) {
      return item.tags.find(t => t.category === name).localized_tag_name;
    },
  },

  computed: {
    items() {
      return this.inventory
        .filter(({ tags }) => tags.some(t => t.category === 'Weapon'))
        .map(i => {
          const kills = i.descriptions.reduce((total, item) => {
            const regex = /StatTrak™ Confirmed Kills: (.*)/i;
            const [match, kills] = item.value.match(regex) || [];

            if (kills || false) {
              total = parseInt(kills);
            }

            return total;
          }, 0);

          return {
            ...i,
            kills,
            skin: i.name.replace(/.*\| (.*)/, '$1'),
            type: this.category(i, 'Type'),
            wear: this.category(i, 'Exterior'),
            weapon: this.category(i, 'Weapon'),
            statTrak: this.category(i, 'Quality') === 'StatTrak™',
          };
        })
        .sort((a, b) => {
          // Sort by weapon type
          if (a.type > b.type) return 1;
          if (a.type < b.type) return -1;

          // Sort by weapon
          if (a.weapon > b.weapon) return 1;
          if (a.weapon < b.weapon) return -1;
        });
    },
  },

  beforeCreate() {
    axios('.netlify/functions/steam', { params: { id: this.$route.params.id } })
      .then(({ data }) => {
        this.inventory = data.descriptions;
      })
      .catch(e => console.error(e));
  },
};
</script>

<template>
  <div class="container">
    <!-- <pre>{{ inventory }}</pre> -->

    <div class="flex flex-wrap -mx-4">
      <div
        v-for="item in items"
        :key="item.icon_url"
        class="w-1/5 p-4 mb-8 text-center"
      >
        <InventoryImage :uri="item.icon_url_large" class="mb-4" />
        <p>{{ item.weapon }} | {{ item.skin }}</p>
        <span class="block text-xs">({{ item.wear }})</span>
        <span class="text-sm stattrak" v-if="item.statTrak"
          >({{ item.kills }} StatTrak™ Kills)</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stattrak {
  color: #cf6a32;
}
</style>
