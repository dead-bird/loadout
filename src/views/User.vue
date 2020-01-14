<script>
export default {
  data: () => ({
    inventory: []
  }),

  beforeCreate() {
    console.log(this.$route.params.id);
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
