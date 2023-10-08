<template>
  <div class="columns">

    <div class="column" style="text-align: center;">
      <div>Join here:</div>
      <img :src="dataURL">
      <div>
        <a :href="quizUrl">{{ quizUrl }}</a>
      </div>
    </div>
    <div class="column">
      <QuestionSetup v-if="typeof questions === 'undefined'" @setupcomplete="questions = $event" />
      <QuizDisplay v-else :questions="questions" :quizId="quizId" @quizended="$emit('quizended')" />
    </div>
  </div>
</template>
<script>
import QuizDisplay from "./quizmaster/QuizDisplay.vue";
import QuestionSetup from "./quizmaster/QuestionSetup.vue";
import QRCode from "../../node_modules/qrcode/lib/browser.js";



export default {
  name: "Quizmaster",
  components: {
    QuizDisplay,
    QuestionSetup,
  },
  data() {
    return {
      quizId: Math.floor(Math.random() * 10000),
      questions: undefined,
      dataURL: undefined
    };
  },
  computed: {
    quizUrl() {
      return window.location.href + "?quizid=" + this.quizId;
    },

  },
  async mounted() {
    this.dataURL = await QRCode.toDataURL(this.quizUrl, {
      width: 300,
      color: {
        dark: "000",
        light: "FFF0"
      }
    });
  }
};
</script>
<style scoped>
.columns {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}

.column {
  width: 100%;
}
</style>