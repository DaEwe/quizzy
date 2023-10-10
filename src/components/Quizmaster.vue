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
      <QuestionSetup v-if="typeof questions === 'undefined'" @setupcomplete="questions = $event"
        @quizidchanged="quizId = $event" />
      <QuizDisplay v-else :questions="questions" :quizId="quizId" @quizended="$emit('quizended')" />
    </div>
  </div>
</template>
<script>
import QuizDisplay from "./quizmaster/QuizDisplay.vue";
import QuestionSetup from "./quizmaster/QuestionSetup.vue";
import QRCode from 'qrcode';
import { getTransitionRawChildren } from "vue";




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
      const url = window.location.href + "?quizid=" + this.quizId;
      this.setDataURL(url);
      return url
    }

  },
  methods: {
    async setDataURL(url) {
      this.dataURL = await QRCode.toDataURL(url, {
        width: 300,
        color: {
          dark: "000",
          light: "FFF0"
        }
      });
    }
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