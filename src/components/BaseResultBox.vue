<template>
  <div class="result-box">
    <p class="trade-id">Trade id : {{ trade.id }}</p>
    <p>Date: {{ trade.date }}</p>
    <p>Ticker: {{ trade.ticker }}</p>
    <p>Direction: {{ trade.direction }}</p>
    <p>Entry point: {{ trade.entry }}</p>
    <p>Stop Loss: {{ trade.stopLoss }}</p>
    <p>Position size : {{ trade.positionSize.toFixed(3) }}</p>
    <p>Calculated take profit: {{ trade.takeProfit }}</p>
    <p>Description: {{ trade.description }}</p>
    <div class="result-box__result">
      <input type="number" v-model="editedResult" placeholder="Enter result" />
      <button @click="saveResult">OK</button>
    </div>
    <span>Result in % : {{ editedResult }}</span>
    <img :src="trade.screenShotLink" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ITrade } from '@/interfaces/ITrade'
@Component
export default class BaseResultBox extends Vue {
  @Prop({ default: {} }) trade!: ITrade

  editedResult = 0

  saveResult() {
    if (this.editedResult !== undefined) {
      this.$store.commit('trade/updateTradeResult', {
        trade: this.trade,
        result: this.editedResult,
      })
    }
  }
}
</script>

<style scoped lang="scss">
.result-box {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 3px solid $yellow;
  border-radius: 10px;
  margin: 16px;
  color: $white;
  position: relative;
  min-width: 300px;

  &__result {
    display: flex;
    align-items: center;
    gap: 12px;

    input {
      padding: 4px;
      background-color: $white;
      font-size: 20px;
      width: 200px;
      border-radius: 8px;
    }
    button {
      padding: 4px;
      background-color: $white;
      font-size: 16px;
      border-radius: 8px;
    }
  }
  .trade-id {
    position: absolute;
    top: 15px;
    right: 30px;
  }

  & img {
    margin: 5px;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
}
</style>
