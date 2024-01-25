<template>
  <div class="my-trades">
    <h1>Trade History</h1>
    <div class="my-trades__top">
      <BaseInput
        type="number"
        label="Deposit size in K"
        id="deposit"
        min="1"
        step="1"
        v-model="depositData.depositSize"
      />
      <BaseInput
        type="number"
        id="riskPerTrade"
        label="Risk per trade"
        min="0.1"
        step="0.1"
        v-model="depositData.riskPerTrade"
      />
      <BaseInput
        type="number"
        id="RRR"
        label="Risk reward ratio 1 :"
        :min="1"
        :step="0.1"
        v-model="depositData.riskReward"
      />
    </div>
    <div class="my-trades__middle">
      <BaseSelect v-model="newTrade.direction" label="Direction" />
      <BaseInput type="text" id="ticker" label="Ticker" v-model="newTrade.ticker" />
      <BaseInput type="text" id="screenshot" label="Screenshot" v-model="newTrade.screenShotLink" />
    </div>
    <div class="my-trades__bottom">
      <BaseInput type="date" id="date" label="Date of trade" v-model="newTrade.date" />
      <BaseInput type="number" id="entry" label="Entry point" :min="1" :step="1" v-model="newTrade.entry" />
      <BaseInput type="number" id="stop" label="Stop-loss" :min="1" :step="1" v-model="newTrade.stopLoss" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { Trade } from '@/interfaces/Trade'

@Component({
  components: {
    BaseInput,
    BaseSelect,
  },
})
export default class MyTrades extends Vue {
  depositData: any = {
    riskPerTrade: 0,
    depositSize: 0,
    depositSizeCalc: 0,
    riskReward: 0,
    avgProfit: 0,
    avgLoss: 0,
  }
  newTrade: Trade = {
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
}
</style>
