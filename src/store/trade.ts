import { ITrade } from '@/interfaces/ITrade'

function findMaxResult(trades: ITrade[]): number {
  if (!trades || trades.length === 0) {
    return 0
  }

  let maxResult = localStorage.getItem('maxResult') ? parseFloat(localStorage.getItem('maxResult')!) : 0

  for (const trade of trades) {
    const result = trade.result
    maxResult = Math.max(maxResult, result)
  }

  console.log(maxResult)
  return maxResult
}

export default {
  namespaced: true,
  state: {
    trades: [],
    maxResult: localStorage.getItem('maxResult') ? parseFloat(localStorage.getItem('maxResult')!) : 0,
  },
  mutations: {
    setTrades(state: any, trades: []) {
      state.trades = trades
      state.maxResult = findMaxResult(state.trades)
      localStorage.setItem('maxResult', state.maxResult.toString())
    },
    addTrade(state: any, newTrade: ITrade) {
      state.trades.push(newTrade)
      state.maxResult = findMaxResult(state.trades)
      localStorage.setItem('maxResult', state.maxResult.toString())
    },
    setMaxResult(state: any, maxResult: number) {
      state.maxResult = maxResult
      console.log(maxResult)
      localStorage.setItem('maxResult', maxResult.toString())
    },

    updateTradeResult(state: any, payload: any) {
      const { trade, result } = payload
      const index = state.trades.findIndex((t: ITrade) => t.id === trade.id)

      if (index !== -1 && state.trades[index].result !== result) {
        state.trades[index].result = result
        state.maxResult = findMaxResult(state.trades)
        console.log(state.maxResult)
        localStorage.setItem('maxResult', state.maxResult.toString())
      }
    },
  },
}
