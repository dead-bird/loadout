<script>
import InventoryImage from "@/components/InventoryImage";
import axios from "axios";

export default {
  components: { InventoryImage },

  data: () => ({
    inventory: []
  }),

  computed: {
    items() {
      return this.inventory.filter(({ tags }) =>
        tags.some(t => t.category === "Weapon")
      );
    }
  },

  beforeCreate() {
    axios(".netlify/functions/steam", { params: { id: this.$route.params.id } })
      .then(({ data }) => {
        this.inventory = data.descriptions;
      })
      .catch(e => console.error(e));
  }
};
</script>

<template>
  <div class="container">
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="item in items"
        :key="item.icon_url"
        class="w-1/5 p-4 mb-8 text-center"
      >
        <InventoryImage :uri="item.icon_url_large" class="mb-4" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
