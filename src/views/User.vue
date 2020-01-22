<script>
import InventoryImage from '@/components/InventoryImage';
import UserCard from '@/components/UserCard';
import axios from 'axios';

export default {
  components: { InventoryImage, UserCard },

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
    <UserCard :user="user" />

    <div class="flex flex-wrap -mx-4">
      <div
        v-for="item in inventory"
        :key="item.icon_url"
        class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 mb-8 text-center"
      >
        <InventoryImage :uri="item.icon_url_large" class="mb-4" />
        <p>{{ item.weapon }} | {{ item.skin }}</p>
        <span class="block text-xs">({{ item.wear }})</span>
        <span class="text-sm stattrak" v-if="item.statTrak">({{ item.kills }} StatTrak™ Kills)</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stattrak {
  color: #cf6a32;
}

svg {
  height: 200px;
  width: 200px;
}

circle {
  fill: transparent;
  stroke: white;
  stroke-width: 1;
}

.dashed {
  stroke-dasharray: 8, 8.5;
}
</style>
