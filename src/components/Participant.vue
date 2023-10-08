<template>
  <div>
    <WelcomeDialog v-if="typeof quizId === 'undefined'" @join-clicked="join" />
    <QuizClient v-else :quizId="quizId" :name="name" />
  </div>
</template>
<script>
import WelcomeDialog from "./participant/WelcomeDialog.vue";
import QuizClient from "./participant/QuizClient.vue";
import UUIDManager from "./util/UUIDManager.js";
export default {
  name: "Participant",
  components: {
    WelcomeDialog,
    QuizClient,
  },
  data() {
    return {
      name: undefined,
      quizId: undefined,
    };
  },
  created() {
    let quizid = new URLSearchParams(window.location.search).get("quizid");
    const uuidmgr = new UUIDManager();
    if (quizid) {
      this.quizId = quizid;
      this.name = uuidmgr.getUUID(quizid);
    }
  },
  methods: {
    join(event) {
      this.name = event.name;
      this.quizId = event.quizId;
    },
  },
};
</script>