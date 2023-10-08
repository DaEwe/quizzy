<template>
  <div class="number-answer-container">
    <div @input="$emit('update:modelValue', modelValue)">
      <div>
        <label for="minVal">Minimal Value</label>
        <input type="number" v-model.number="modelValue.number_limits[0]" id="minVal" />
      </div>
    </div>
    <div class="a-text-field">
      <label for="maxVal">Maximal Value</label>
      <input type="number" v-model.number="modelValue.number_limits[1]" id="maxVal" />
    </div>
  </div>
</template>
<script>
export default {
  name: "NumberAnswerForm",
  props: ["modelValue"],
  created() {
    if (!("number_limits" in this.modelValue)) {
      this.$set(this.modelValue, "number_limits", [0, 100]);
    }
  },
};
</script>
<style scoped>
label {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 5px;
}

.number-answer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 5px;
}
</style>