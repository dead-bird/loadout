<script>
import axios from "axios";

export default {
  data: () => ({
    inventory: []
  }),

  beforeCreate() {
    axios(".netlify/functions/steam", { params: { id: this.$route.params.id } })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>

<template>
  <div>
    <h1>
      Hello User:
      <pre>{{ $route.params.id }}</pre>
    </h1>
  </div>
</template>
