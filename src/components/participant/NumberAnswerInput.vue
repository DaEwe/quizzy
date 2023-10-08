<template>
  <div class="number-answer-container">
    <h3>
      Enter number between {{ answer.options.number_limits[0] }} and
      {{ answer.options.number_limits[1] }}!
    </h3>
    <div>
      <input type="number" v-model="value" :min="answer.options.number_limits[0]" :max="answer.options.number_limits[1]"
        @input="$emit('answered', value)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MCAnswerInput",
  props: ["answer"],
  data() {
    return { value: this.answer.options.number_limits[0] };
  },
};
</script>

<style scoped>
.number-answer-container {
  margin-top: 5px;
  margin-bottom: 5px;
}

h3 {
  margin-bottom: 5px;
}
</style>