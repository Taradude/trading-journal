<template>
  <div class="base-input">
    <img src="" alt="" />
    <label for=""></label>
    <input :type="type" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: '' }) type!: string
}
</script>

<style scoped lang="scss"></style>
