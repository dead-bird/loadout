<script>
export default {
  data: () => ({ id: 76561198006960956 })
};
</script>

<template>
  <div class="container h-screen items-center justify-center flex">
    <input
      class="bg-transparent px-4 py-3 mr-8 text-center border-b-2 border-white"
      type="text"
      v-model="id"
    />
    <router-link :to="`/${id}`">Search &rarr;</router-link>
  </div>
</template>

<style lang="scss" scoped></style>
