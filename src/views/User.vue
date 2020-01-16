<script>
import InventoryImage from '@/components/InventoryImage';
import axios from 'axios';

export default {
  components: { InventoryImage },

  data: () => ({
    user: {},
    inventory: [],
  }),

  beforeCreate() {
    axios(`${process.env.VUE_APP_API}user/${this.$route.params.id}`)
      .then(({ data }) => {
        this.user = data.user;
        this.inventory = data.inventory;
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
        v-for="item in inventory"
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
