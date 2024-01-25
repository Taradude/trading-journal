<template>
  <div class="base-select">
    <label for="">{{ label }}</label>
    <select name="base" :id="id" v-model="selectedDirection" @change="handleDirectionChange">
      <option value="" disabled selected hidden>Direction</option>
      <option value="Long">Long</option>
      <option value="Short">Short</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseSelect extends Vue {
  @Prop({ default: '' }) id!: string
  @Prop(String) value!: string
  @Prop({ default: '' }) label!: string

  get selectedDirection(): string {
    return this.value
  }

  set selectedDirection(newValue: string) {
    this.$emit('input', newValue)
  }

  handleDirectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value
    this.selectedDirection = selectedValue
  }
}
</script>

<style scoped lang="scss">
.base-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  justify-content: center;

  label {
    font-weight: bold;
    background: linear-gradient(90deg, $white 35%, $yellow 100%);
    -webkit-background-clip: text;
    color: transparent;
    padding: 6px;
    font-size: 20px;
  }
  select {
    text-align: center;
    min-width: 200px;
    padding: 12px 6px;
    border-radius: 12px;
    background-color: $white;
    color: $black;
    font-weight: bold;
    margin-bottom: 10px;

    option {
      background: $white;
      color: $black;
    }
  }
}
</style>
