<template>
  <div class="home">
    <h1>Trading Journal</h1>
    <h2>Note everything and get trading insights</h2>
    <div class="home__crypto">
      <p class="home__crypto__coin-price">BTC : {{ btcPrice }} <span>$</span></p>
      <p class="home__crypto__coin-price">ETH : {{ ethPrice }} <span>$</span></p>
      <p class="home__crypto__coin-price">SOL : {{ solPrice }} <span>$</span></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class HomeView extends Vue {
  ethPrice = 0
  solPrice = 0
  btcPrice = 0

  async created() {
    this.ethPrice = await this.getData('eth')
    this.solPrice = await this.getData('sol')
    this.btcPrice = await this.getData('btc')
  }

  async getData(coin: string): Promise<number> {
    coin = coin.toUpperCase()
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD`
    const response = await fetch(url)
    const json = await response.json()
    return json.USD
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  &__crypto {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__coin-price {
      font-size: 36px;
      color: $yellow;
      padding: 12px;
      margin: 10px;
      font-weight: 800;
      border: 4px solid $white;
      border-radius: 25px;
      > span {
        color: $green;
      }
    }
  }
  @media screen and (max-width: 767px) {
    .home > h1,
    h2 {
      text-align: center;
    }
    .home__crypto {
      flex-direction: column;
    }
  }
}
</style>
