<template>
  <div class="main-container">
    <h3>Please set up your Quiz</h3>
    <div class="question-container">
      <QuestionForm v-for="(question, id) in questions" :key="questions[id].question_id" v-model="questions[id]" />
    </div>
    <div class="dialog-buttons">
      <button @click="add">
        Add question
      </button>
      <button @click="load">
        Load last quiz
      </button>
      <button @click="clear">
        Clear questions
      </button>
    </div>
    <div class="dialog-buttons">
      <button @click="setupcomplete">
        Start the Quiz!
      </button>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import QuestionForm from "./QuestionForm.vue";
export default {
  name: "QuestionSetup",
  components: {
    QuestionForm,
  },
  data() {
    return {
      questions: [],
    };
  },
  mounted() { },
  methods: {
    add() {
      this.questions.push({
        question_id: uuidv4(),
        question: "",
        answer: {
          answertype: "",
          options: {},
        },
      });
    },
    load() {
      const questions = JSON.parse(localStorage.getItem("questions"));
      if (questions) {
        this.questions = questions;
      }
    },
    clear() {
      this.questions = [];
    },
    setupcomplete() {
      localStorage.setItem("questions", JSON.stringify(this.questions));
      this.$emit("setupcomplete", this.questions);
    },
  },
};
</script>
<style lang="scss">
.buttons>button {
  margin-inline: 5px;
  margin-top: -40px;
  margin-bottom: -40px;
}

.question-container {
  display: flex;
  flex-direction: column;
}
</style>