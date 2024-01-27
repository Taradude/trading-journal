<template>
  <div class="base-input">
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" :min="min" :step="step" @input="onInputUpdate($event.target?.value)" />
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

  onInputUpdate(modelValue: string | number) {
    this.$emit('input', modelValue)
  }
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
    color: $yellow;
    padding: 6px;
    font-size: 20px;
  }
  input {
    text-align: center;
    min-width: 200px;
    padding: 12px;
    border-radius: 12px;
    background-color: $white;
    color: $black;
    font-weight: bold;
  }
}
</style>
