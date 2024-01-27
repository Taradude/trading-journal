import { Trade } from '@/interfaces/Trade'

export default {
  namespaced: true,
  state: {
    trades: [],
  },
  getters: {},
  mutations: {
    addTrade(newTrade: Trade, state: any) {
      state.trades.push(newTrade)
    },
    // calculateTakeProfit() {
    //   const distanceToStop = Math.abs(this.newTrade.entry - this.newTrade.stopLoss)
    //   if (this.newTrade.direction === 'long') {
    //     const takeProfit = distanceToStop * this.riskReward + +this.newTrade.entry
    //     this.newTrade.takeProfit = takeProfit
    //   } else if (this.newTrade.direction === 'short') {
    //     const takeProfit = distanceToStop * this.riskReward - +this.newTrade.entry
    //     this.newTrade.takeProfit = Math.abs(takeProfit)
    //   }
    // },
  },
  actions: {},
  modules: {},
}
