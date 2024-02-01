<template>
  <div class="my-trades">
    <h1>Position size Calculator</h1>
    <div class="my-trades__top">
      <BaseInput
        type="number"
        label="Deposit size"
        id="deposit"
        min="1000"
        step="100"
        v-model="newTrade.depositSize"
      />
      <BaseInput
        type="number"
        id="riskPerTrade"
        label="Risk per trade %"
        min="0.1"
        step="0.1"
        v-model="newTrade.riskPerTrade"
      />
      <BaseInput
        type="number"
        id="RRR"
        label="Risk reward ratio 1 :"
        :min="1"
        :step="0.1"
        v-model="newTrade.riskReward"
      />
    </div>
    <div class="my-trades__middle">
      <BaseSelect v-model="newTrade.direction" label="Direction" />
      <BaseInput type="text" id="ticker" label="Ticker" v-model="newTrade.ticker" />

      <BaseInput
        title="Screenshot url"
        type="text"
        id="screenshot"
        label="Screenshot"
        v-model="newTrade.screenShotLink"
      />
    </div>
    <div class="my-trades__bottom">
      <BaseInput type="date" id="date" label="Date of trade" v-model="newTrade.date" />
      <BaseInput type="number" id="entry" label="Entry point" :min="1" :step="1" v-model="newTrade.entry" />
      <BaseInput type="number" id="stop" label="Stop-loss" :min="1" :step="1" v-model="newTrade.stopLoss" />
    </div>
    <textarea
      v-model="newTrade.description"
      name="descriptionі"
      id="description"
      placeholder="Full description of a trade with emotions and reasons"
    ></textarea>
    <button class="my-trades__btn" @click="addTrade">Add trade</button>
    <h2>Trade History</h2>
    <BaseResultBox v-for="(trade, index) in $store.state.trade.trades" :key="index" :trade="trade" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseResultBox from '@/components/BaseResultBox.vue'
import { ITrade } from '@/interfaces/ITrade'
import { v4 as uuidv4 } from 'uuid'

@Component({
  components: {
    BaseInput,
    BaseSelect,
    BaseResultBox,
  },
})
export default class MyTrades extends Vue {
  newTrade: ITrade = {
    riskPerTrade: 0,
    depositSize: 0,
    date: '',
    ticker: '',
    direction: '',
    entry: 0,
    stopLoss: 0,
    positionSize: 0,
    takeProfit: 0,
    description: '',
    result: 0,
    screenShotLink: '',
    riskReward: 0,
    id: '',
  }
  get tradesLength() {
    return this.$store.state.trade.trades.length
  }

  mounted() {
    const savedTrades = localStorage.getItem('trades')
    if (savedTrades) {
      const tradesArray = JSON.parse(savedTrades)
      if (tradesArray.length > 0) {
        this.$store.commit('trade/setTrades', tradesArray)
        const lastTrade = tradesArray[tradesArray.length - 1]
        this.$data.newTrade = { ...lastTrade }
      }
    }
  }

  beforeDestroy() {
    localStorage.setItem('trades', JSON.stringify(this.$store.state.trade.trades))
    localStorage.setItem('lastTradeId', this.$data.newTrade.id)
  }

  addTrade() {
    if (!this.$data.newTrade.id) {
      this.$data.newTrade.id = uuidv4()
    }
    if (
      !this.$data.newTrade.ticker ||
      !this.$data.newTrade.direction ||
      !this.$data.newTrade.entry ||
      !this.$data.newTrade.stopLoss
    ) {
      alert('Please fill in all fields before adding a trade.')
      return
    }

    const entryPrice = +this.$data.newTrade.entry
    const stopLossPrice = +this.$data.newTrade.stopLoss

    if (this.$data.newTrade.direction === 'long' && stopLossPrice >= entryPrice) {
      alert('Stop loss should be less than entry price for long trades.')
      return
    }

    if (this.$data.newTrade.direction === 'short' && entryPrice >= stopLossPrice) {
      alert('Entry price should be less than stop loss for short trades.')
      return
    }

    const distanceToStop = this.calculateDistanceToStop()

    if (this.$data.newTrade.direction === 'long') {
      this.$data.newTrade.takeProfit = distanceToStop * this.$data.newTrade.riskReward + entryPrice
    } else if (this.$data.newTrade.direction === 'short') {
      this.$data.newTrade.takeProfit = Math.abs(distanceToStop * this.$data.newTrade.riskReward - entryPrice)
    }

    const positionSize = this.calculatePositionSize()

    if (positionSize !== undefined) {
      this.$data.newTrade.positionSize = positionSize
      this.$store.commit('trade/addTrade', this.$data.newTrade)
      localStorage.setItem('trades', JSON.stringify(this.$store.state.trade.trades))
      localStorage.setItem('lastTradeId', this.$data.newTrade.id)
      this.clearForm()
    } else {
      console.error('Position size is not a number:', positionSize)
    }
  }

  calculatePositionSize(): number | undefined {
    if (
      this.newTrade.entry >= 0.000001 &&
      this.newTrade.riskPerTrade < 100 &&
      this.newTrade.stopLoss >= 0.000001
    ) {
      const riskAmount = (this.newTrade.depositSize * this.newTrade.riskPerTrade) / 100

      const distanceToStop = Math.abs(+this.newTrade.entry - +this.newTrade.stopLoss)

      const positionSize = riskAmount / distanceToStop

      return positionSize
    }

    return undefined
  }

  calculateDistanceToStop(): number {
    return Math.abs(this.newTrade.entry - this.newTrade.stopLoss)
  }
  clearForm() {
    this.newTrade = {
      depositSize: 0,
      riskPerTrade: 0,
      date: '',
      ticker: '',
      direction: '',
      entry: 0,
      stopLoss: 0,
      positionSize: 0,
      takeProfit: 0,
      description: '',
      result: 0,
      riskReward: 0,
      screenShotLink: '',
      id: '',
    }
  }
}
</script>

<style scoped lang="scss">
.my-trades {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__top,
  &__middle,
  &__bottom {
    padding: 16px;
    display: flex;
    flex-direction: row;
  }
  @media screen and (max-width: 767px) {
    &__top,
    &__middle,
    &__bottom {
      flex-direction: column;
      padding: 0;
    }
  }
  #description {
    margin: 10px;
    font-size: 18px;
    padding: 10px;
    border-radius: 15px;
    width: 80%;
    max-width: 660px;
    min-width: 200px;
    min-height: 200px;
    overflow-y: hidden;
    overflow-x: hidden;
    background-image: url('@/assets/chart.avif');
    background-size: cover;
    color: #fff;

    &::placeholder {
      color: rgb(255, 205, 7);
      padding: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__btn {
    padding: 12px;
    font-size: 20px;
    border-radius: 12px;
    background-color: $white;
    color: $black;
  }
}
</style>
