<template>
  <div class="main-layout">
    <div class="main-layout__page">
      <nav class="main-layout__page__header">
        <router-link to="/">Home</router-link>
        <router-link to="/trades">My trades</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
      </nav>
      <transition :name="$route.meta?.transition || 'fade'" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
export default class MainLayout extends Vue {}
</script>

<style lang="scss">
.main-layout {
  &__page {
    padding: 64px 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-wrap {
      max-width: 1140px;
      width: 100%;
    }

    &__header {
      display: flex;
      flex-direction: row;
      gap: 64px;
      padding: 16px;
      width: 80%;
      align-items: center;
      justify-content: right;
    }
  }
}
@media screen and (max-width: 767px) {
  .main-layout__page {
    padding: 12px;
  }
  .main-layout__page__header {
    gap: 24px;
  }
}
</style>
