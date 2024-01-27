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
    <textarea
      v-model="newTrade.description"
      name="descriptionі"
      id="description"
      placeholder="Full description with emotions and reasons"
    ></textarea>
    <button class="my-trades__btn" @click="addTrade">Add trade</button>
    <BaseResultBox v-for="trade in $store.state.trades" :key="trade.id" :trade="trade" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { Trade } from '@/interfaces/Trade'
import BaseResultBox from '@/components/BaseResultBox.vue'

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
    id: 0,
  }
  get tradesLength() {
    return this.$store.state.trade.trades || []
  }

  // addTrade() {
  //   const tradeId = this.tradesLength + 1
  //   this.newTrade.id = tradeId

  //   this.$store.commit('trades/addTrade', this.newTrade)

  //   this.clearForm()
  // }
  addTrade() {
    // const tradeId = this.tradesLength && this.tradesLength > 0 ? this.tradesLength + 1 : 1
    // this.newTrade.id = tradeId

    // if (
    //   !this.newTrade.date ||
    //   !this.newTrade.ticker ||
    //   !this.newTrade.direction ||
    //   !this.newTrade.entry ||
    //   !this.newTrade.stopLoss
    // ) {
    //   alert('Please fill in all fields before adding a trade.')
    //   return
    // }

    // Валідація для newTrade.id
    // if (!this.newTrade.id) {
    //   this.newTrade.id = 1 // Якщо id не вказано, встановлюємо значення 1
    // }
    // console.log(this.tradesLength)
    this.$store.commit('trade/addTrade', this.newTrade)

    // this.clearForm()
  }
  clearForm() {
    this.newTrade = {
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
      id: 0,
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
