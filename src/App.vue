<template>
  <div id="app" class="py-12">
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  @apply bg-gray-900 text-white;
}

pre,
code {
  @apply p-4 bg-gray-300 text-black overflow-scroll;
}
</style>
