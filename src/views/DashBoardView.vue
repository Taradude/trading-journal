<template>
  <div class="dashboard">
    <div class="stats">
      <div class="stats__item">
        Total trades: <span>{{ totalTrades }}</span>
      </div>
      <div class="stats__item">
        Best trade: <span>${{ maxTradeProfit }}</span>
      </div>
    </div>
    <div class="dashboard__chart">
      <Bar :data="chartData"></Bar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Bar } from 'vue-chartjs'
import Chart from 'chart.js/auto'

import { ITrade } from '@/interfaces/ITrade'

@Component({
  components: {
    Bar,
    Chart,
  },
})
export default class DashBoardView extends Vue {
  get totalTrades(): number {
    return this.$store.state.trade.trades.length
  }
  get maxTradeProfit(): number {
    const trades = this.$store.state.trade.trades
    return trades.length > 0 ? (this.$store.state.trade.maxResult / 100) * trades[0].depositSize : 0
  }
  get chartData(): object {
    const trades = this.$store.state.trade.trades

    const labels = trades.map((trade: ITrade) => trade.ticker)
    const data = trades.map((trade: ITrade) => this.convertPercentageToMoney(trade.result))

    return {
      labels: labels,
      datasets: [
        {
          label: 'Trade Results',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data,
        },
      ],
    }
  }

  convertPercentageToMoney(result: number): number {
    return (result / 100) * this.$store.state.trade.trades[0].depositSize
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
