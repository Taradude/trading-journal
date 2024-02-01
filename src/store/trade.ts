import { ITrade } from '@/interfaces/ITrade'

function findMinMaxResults(trades: ITrade[]) {
  if (!trades || trades.length === 0) {
    return { maxResult: 0, minResult: 0 }
  }

  const initialMinMax = {
    maxResult: trades[0].result,
    minResult: trades[0].result,
  }

  const { maxResult, minResult } = trades.reduce((acc, trade) => {
    const result = trade.result

    return {
      maxResult: Math.max(acc.maxResult, result),
      minResult: Math.min(acc.minResult, result),
    }
  }, initialMinMax)

  return { maxResult, minResult }
}

export default {
  namespaced: true,
  state: {
    trades: [],
    minResult: localStorage.getItem('minResult') ? parseFloat(localStorage.getItem('minResult')!) : 0,
    maxResult: localStorage.getItem('maxResult') ? parseFloat(localStorage.getItem('maxResult')!) : 0,
  },
  mutations: {
    setTrades(state: any, trades: []) {
      state.trades = trades
      const { maxResult, minResult } = findMinMaxResults(state.trades)
      state.maxResult = maxResult
      state.minResult = minResult
      localStorage.setItem('minResult', minResult.toString())
      localStorage.setItem('maxResult', maxResult.toString())
    },
    addTrade(state: any, newTrade: ITrade) {
      state.trades.push(newTrade)
      const { maxResult, minResult } = findMinMaxResults(state.trades)
      state.maxResult = maxResult
      state.minResult = minResult
      localStorage.setItem('minResult', minResult.toString())
      localStorage.setItem('maxResult', maxResult.toString())
    },
    setMaxResult(state: any, maxResult: number) {
      state.maxResult = maxResult
      localStorage.setItem('maxResult', maxResult.toString())
    },
    setMinResult(state: any, minResult: number) {
      state.minResult = minResult
      localStorage.setItem('minResult', minResult.toString())
    },

    updateTradeResult(state: any, payload: any) {
      const { trade, result } = payload
      const index = state.trades.findIndex((t: ITrade) => t.id === trade.id)

      if (index !== -1 && state.trades[index].result !== result) {
        state.trades[index].result = result
        const { maxResult, minResult } = findMinMaxResults(state.trades)
        state.maxResult = maxResult
        state.minResult = minResult
        console.log(maxResult, minResult)
        localStorage.setItem('minResult', minResult.toString())
        localStorage.setItem('maxResult', maxResult.toString())
      }
    },
  },
}
