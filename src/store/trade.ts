import { MutationTree } from 'vuex'
import { ITrade } from '@/interfaces/ITrade'

export default {
  namespaced: true,
  state: {
    trades: [],
  },
  mutations: {
    addTrade(state: any, newTrade: ITrade) {
      state.trades.push(newTrade)
    },

    updateTradeResult(state: any, payload: any) {
      console.log('adas')
      const { trade, result } = payload
      const index = state.trades.findIndex((t: ITrade) => t.id === trade.id)
      if (index !== -1) {
        state.trades[index].result = result
      }
    },
  },
}
