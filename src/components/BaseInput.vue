<template>
  <div class="base-input">
    <img src="" alt="" />
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" :min="min" :step="step" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: '' }) type!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) id!: string
  @Prop({ default: '' }) min!: string
  @Prop({ default: '' }) step!: string
  @Prop({ default: '' }) modelValue!: string | number
}
</script>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;

  label {
    font-weight: bold;
    background: linear-gradient(90deg, $white 35%, $yellow 100%);
    -webkit-background-clip: text;
    color: transparent;
    padding: 6px;
    font-size: 20px;
  }
  input {
    min-width: 200px;
    padding: 12px;
    border-radius: 12px;
    background-color: $white;
    color: $black;
    font-weight: bold;
    text-align: center;
  }
}
</style>
