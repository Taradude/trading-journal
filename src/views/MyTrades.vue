<template>
  <div class="my-trades">
    <BaseInput type="number" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/BaseInput.vue'
@Component({
  components: {
    BaseInput,
  },
})
export default class MyTrades extends Vue {}
</script>

<style scoped></style>
