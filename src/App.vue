<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  box-sizing: border-box;
  background-color: $grey;
  font-family: $font-family-default;
}
</style>
