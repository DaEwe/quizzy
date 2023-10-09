<template>
  <section>
    <div v-if="typeof question === 'undefined'">
      <h1>Waiting for the Quiz to start..</h1>

    </div>
    <div v-else>
      <h1>{{ question.question }}</h1>
      <component v-if="question.answer.answertype !== 'none'" :is="components[question.answer.answertype]"
        @answered="(answer) => response = answer" :answer="question.answer" />
      <div class="answer-field">
        <button @click="giveAnswer(response)">
          Send
        </button>
        <span>
          <DotsHorizontalIcon v-if="pending" />
          <Check v-if="success" />
        </span>
      </div>

    </div>
  </section>
</template>

<script>
import DotsHorizontalIcon from "vue-material-design-icons/DotsHorizontal.vue";
import Check from "vue-material-design-icons/Check.vue";
import { ProxyAsset, AssetWatcher } from "assets2036js";
import TextAnswerInput from "./TextAnswerInput.vue";
import NumberAnswerInput from "./NumberAnswerInput.vue";
import MCAnswerInput from "./MCAnswerInput.vue";
export default {
  components: {
    TextAnswerInput,
    NumberAnswerInput,
    MCAnswerInput,
    Check,
    DotsHorizontalIcon
  },
  name: "QuizClient",
  props: ["quizId", "name"],
  data() {
    return {
      question: undefined,
      response: undefined,
      pending: false,
      success: false,
      components: {
        mc: "MCAnswerInput",
        number: "NumberAnswerInput",
        text: "TextAnswerInput",
      },
    };
  },
  async mounted() {
    this.watcher = new AssetWatcher(import.meta.env.VITE_BROKER_URL,
      parseInt(import.meta.env.VITE_BROKER_PORT), true);
    await this.watcher.connect();
    console.log("watcher connected");
    this.watcher.onAssetOnline("quizzy", this.quizId, this.connectToAsset)



  },
  methods: {
    async connectToAsset(assetOnline) {
      console.log("quiz is online: ", assetOnline);
      this.asset = new ProxyAsset(
        import.meta.env.VITE_BROKER_URL,
        parseInt(import.meta.env.VITE_BROKER_PORT),
        "quizzy",
        this.quizId, true
      );
      await this.asset.connect();
      this.asset.quiz.on_current_question(
        this.onQuestion
      );
    },
    onQuestion(question) {
      this.question = question;
      this.response = undefined;
      this.success = false;
    },
    async giveAnswer(answer) {
      this.pending = true;
      this.success = false;
      await this.asset.quiz.giveAnswer({
        name: this.name,
        question_id: this.question.question_id,
        answer: answer,
      });
      this.pending = false;
      this.success = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.answer-field {
  display: flex;
  align-items: center;
  gap: 5px
}
</style>>