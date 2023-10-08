<template>
  <section v-if="loaded">
    <h1>{{ currentQuestion.question }}</h1>
    <component class="answers" :is="components[currentQuestion.answer.answertype]" :answers="currentAnswers" />
    <button @click="nextQuestion">
      {{ buttonText }}
    </button>
  </section>
</template>
<script>
import { Asset } from "assets2036js";
import MCAnswerDisplay from "./MCAnswerDisplay.vue";
import NumberAnswerDisplay from "./NumberAnswerDisplay.vue";
import TextAnswerDisplay from "./TextAnswerDisplay.vue";

export default {
  name: "QuizDisplay",
  props: ["quizId", "questions"],
  asset: undefined,
  components: {
    MCAnswerDisplay,
    NumberAnswerDisplay,
    TextAnswerDisplay,
  },
  data() {
    return {
      quizOver: false,
      currentIdx: 0,
      loaded: false,
      currentAnswers: {},
      components: {
        mc: "MCAnswerDisplay",
        number: "NumberAnswerDisplay",
        text: "TextAnswerDisplay",
        "": "TextAnswerDisplay",
      },
    };
  },
  computed: {
    buttonText() {
      return this.currentIdx < this.questions.length - 1
        ? "Next Question"
        : "End Quiz";
    },
    currentQuestion() {
      return this.questions[this.currentIdx];
    },
  },
  async mounted() {
    this.asset = new Asset(
      process.env.VUE_APP_BROKER_URL,
      parseInt(process.env.VUE_APP_BROKER_PORT),
      "quizzy",
      this.quizId.toString(), true
    );

    await this.asset.connect();
    await this.asset.registerAspect(process.env.VUE_APP_QUIZ_SM_URL);

    this.asset.quiz.bind_giveAnswer((params) => {
      console.log("got ", params);
      return this.onAnswer(params);
    });
    this.publishQuestion();
    this.loaded = true;
  },
  methods: {
    onAnswer(params) {
      console.log("Received answer");
      const participantName = params.name;
      const answer = params.answer;
      const question_id = params.question_id;
      if (question_id !== this.currentQuestion.question_id) {
        return false;
      }
      this.currentAnswers[participantName] = answer;
      return true;
    },
    nextQuestion() {
      this.currentAnswers = {};
      if (this.currentIdx < this.questions.length - 1) {
        this.currentIdx++;
        this.publishQuestion();
      } else {
        this.endQuiz();
      }
    },
    publishQuestion() {
      this.asset.quiz.current_question = this.currentQuestion;
    },
    endQuiz() {
      this.asset.quiz.current_question = {
        question: "Quiz has ended.",
        answer: { answertype: "none" },
      };
      this.$emit("quizended");
    },
  },
};
</script>
<style lang="scss" scoped>
.answers {
  padding-bottom: 10px;
}
</style>