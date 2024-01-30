<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  box-sizing: border-box;
  background-color: $grey;
  font-family: $font-family-default;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s;
}
.slide-left-enter,
.slide-left-leave-to,
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
