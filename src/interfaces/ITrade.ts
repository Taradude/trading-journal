export interface ITrade {
  riskPerTrade: number
  depositSize: number
  date: string
  ticker: string
  direction: string
  entry: number
  stopLoss: number
  positionSize: number
  takeProfit: number
  description: string
  result: number
  screenShotLink: string
  riskReward: number
  id: string
}
