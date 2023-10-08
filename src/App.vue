<template>
  <div class="app" id="app">
    <div class="main-container">
      <h1 class="quizzy-title">Quizzy✨</h1>
      <ModeDialog v-if="typeof mode === 'undefined'" @chosen="mode = $event" />
      <component v-if="mode" :is="mode" @quizended="mode = undefined" />
    </div>
  </div>
</template>

<script>
import Participant from "./components/Participant.vue";
import Quizmaster from "./components/Quizmaster.vue";
import ModeDialog from "./components/ModeDialog.vue";
export default {
  name: "App",
  components: {
    ModeDialog,
    Participant,
    Quizmaster,
  },
  data() {
    return {
      mode: undefined,
    };
  },
  created() {
    let quizid = new URLSearchParams(window.location.search).get("quizid");
    if (quizid) {
      this.mode = "Participant";
    }
  },
};
</script>

<style lang="scss">
.app {
  margin: 2vh;

  &-header {
    width: 160px;
  }
}

.quizzy-title {
  color: black;
  background-color: white;
  font-family: "pixelify";
  font-size: 3em;
  border: 2px solid black;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
}

button {
  margin: 0 0;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
