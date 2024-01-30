<template>
  <div class="dashboard">
    <div class="dashboard__stats">
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
    </div>
    <div class="dashboard__chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DashBoardView extends Vue {}
</script>

<style scoped></style>
