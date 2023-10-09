<template>
  <div class="question-container">
    <div @input="$emit('update:modelValue', modelValue)">
      <div>
        <label :for="modelValue.question_id + '_input'">Question</label>
        <input type="text" v-model="modelValue.question" :id="modelValue.question_id + '_input'" />
      </div>
    </div>
    <div>
      <label for="answerType">Answer Type</label>
      <select v-model="modelValue.answer.answertype" id="answerType">
        <option value="number">Number</option>
        <option value="mc">Multiple Choice</option>
        <option value="text">Free Text</option>
      </select>
    </div>
    <component :is="components[modelValue.answer.answertype]" v-model="modelValue.answer.options" />
  </div>
</template>
<script>
import NumberAnswerForm from "./NumberAnswerForm.vue";
import MCAnswerForm from "./MCAnswerForm.vue";
import TextAnswerForm from "./TextAnswerForm.vue";
export default {

  name: "QuestionForm",
  components: {
    NumberAnswerForm,
    MCAnswerForm,
    TextAnswerForm,
  },
  props: {
    modelValue: Object,
  },
  data() {
    return {
      components: {
        number: "NumberAnswerForm",
        mc: "MCAnswerForm",
        text: "TextAnswerForm",
      },
    };
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

.question-container {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}
</style>