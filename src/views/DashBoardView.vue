<template>
  <div class="dashboard">
    <div class="stats">
      <div class="stats__item">
        Total trades: <span>{{ totalTrades }}</span>
      </div>
      <div class="stats__item">
        Best trade: <span>${{ maxTradeProfit }}</span>
      </div>
      <div class="stats__item">
        Worst trade: <span>${{ minTradeProfit }}</span>
      </div>
    </div>
    <div class="dashboard__chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DashBoardView extends Vue {
  get totalTrades(): number {
    return this.$store.state.trade.trades.length
  }

  get maxTradeProfit(): number {
    return this.$store.state.trade.maxResult
  }

  get minTradeProfit(): number {
    return this.$store.state.trade.minResult
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  padding-top: 50px;
  &__stats {
    display: flex;
    justify-content: space-between;
    gap: 100px;
  }

  .stats {
    display: flex;
    gap: 64px;
  }

  .stats__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 16px;
    font-size: 42px;
    color: $white;
    font-weight: bold;

    span {
      color: $yellow;
    }
  }

  @media screen and (max-width: 767px) {
    .stats__item {
      font-size: 24px;
      gap: 0;
      flex-direction: column;
    }
  }
}
</style>
