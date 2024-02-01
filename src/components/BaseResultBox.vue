<template>
  <div class="result-box">
    <p>Date: {{ trade.date }}</p>
    <p>Ticker: {{ trade.ticker.toUpperCase() }}</p>
    <p>Direction: {{ trade.direction }}</p>
    <p>Entry point: {{ trade.entry }}</p>
    <p>Stop Loss: {{ trade.stopLoss }}</p>
    <p>Position size : {{ trade.positionSize.toFixed(3) }}</p>
    <p>Calculated take profit: {{ trade.takeProfit }}</p>
    <p>Description: {{ trade.description }}</p>
    <div v-if="isClicked" class="result-box__result">
      <input v-if="isInputVisible" type="number" v-model="editedResult" placeholder="Enter result" />
      <button v-if="isInputVisible" @click="saveResult">OK</button>
    </div>
    <p>Result in % : {{ editedResult }}</p>
    <img :src="trade.screenShotLink" alt="" />
    <p class="trade-id">Trade id : {{ trade.id.substring(0, 6) }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ITrade } from '@/interfaces/ITrade'
@Component
export default class BaseResultBox extends Vue {
  @Prop({ default: {} }) trade!: ITrade

  editedResult = 0
  isClicked = true
  isInputVisible = true

  saveResult() {
    if (this.editedResult !== undefined) {
      this.isInputVisible = false
      this.$store.commit('trade/updateTradeResult', {
        trade: this.trade,
        result: this.editedResult,
      })
      localStorage.setItem(`editedResult_${this.trade.id}`, this.editedResult.toString())
    }
  }
  mounted() {
    const savedEditedResult = localStorage.getItem(`editedResult_${this.trade.id}`)
    if (savedEditedResult) {
      this.editedResult = parseFloat(savedEditedResult)
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

  p {
    font-size: 20px;
    font-weight: bold;
  }
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

    button:hover {
      background-color: $yellow;
      transform: scale(1.1);
    }
  }
  .trade-id {
    display: flex;
    justify-content: flex-end;
  }
  & img {
    margin: 5px;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
}
</style>
