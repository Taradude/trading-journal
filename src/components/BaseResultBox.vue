<template>
  <div class="result-box">
    <div class="left">
      <p>Date: {{ trade.date }}</p>
      <p>Ticker: {{ trade.ticker.toUpperCase() }}</p>
      <p>Direction: {{ trade.direction }}</p>
      <p>Entry point: {{ trade.entry }}</p>
      <p>Stop Loss: {{ trade.stopLoss }}</p>
      <p>Position size : {{ trade.positionSize }}</p>
      <p>Calculated take profit: {{ trade.takeProfit }}</p>
      <p>Trade id : {{ trade.id }}</p>
    </div>
    <div class="right">
      <div class="wrap">
        <p>Description: {{ trade.description }}</p>
      </div>
      <div class="inline">
        <span>Result in % : {{ trade.result }}</span>
      </div>
      <div class="wrap inline"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Trade } from '@/interfaces/Trade'
@Component
export default class BaseResultBox extends Vue {
  @Prop({ default: {} }) trade!: Trade
}
</script>

<style scoped lang="scss"></style>
