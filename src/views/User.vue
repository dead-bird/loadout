<script>
import axios from "axios";

export default {
  data: () => ({
    inventory: []
  }),

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
  <pre>{{ inventory }}</pre>
</template>
