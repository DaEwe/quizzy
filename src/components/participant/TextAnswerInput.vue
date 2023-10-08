<template>
  <div class="text-answer-container">
    <input type="text" :value="modelValue" id="answer" @input="$emit('answered', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: ["answer"],
};
</script>

<style scoped>
.text-answer-container {
  margin-bottom: 5px;
}
</style>