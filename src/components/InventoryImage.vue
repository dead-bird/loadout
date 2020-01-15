<script>
export default {
  props: ['uri'],
};
</script>

<template>
  <img
    :src="`https://steamcommunity.com/economy/image/${uri}`"
    alt="Inventory Image"
  />
</template>

<style scoped lang="scss"></style>
