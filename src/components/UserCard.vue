<script>
export default {
  props: ['user'],

  computed: {
    name() {
      return this.user.realname ? `${this.user.realname} | ` : '';
    },
  },
};
</script>

<template>
  <div>
    <svg class="mx-auto" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="50" class="dashed" />
      <foreignObject x="5" y="5" height="100px" width="100px">
        <div class="p-3">
          <img :src="user.avatarfull" class="rounded-full overflow-hidden" />
        </div>
      </foreignObject>
    </svg>

    <div class="text-center mb-24">
      <p class="font-bold text-3xl">{{ user.personaname }}</p>
      <p class="text-sm mb-8">{{ name + user.loccountrycode }}</p>
      <a :href="user.profileurl" target="_blank" rel="noopener noreferrer">View Profile &rarr;</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
