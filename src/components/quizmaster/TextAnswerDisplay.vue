<template>
  <div>
    <div v-for="(answer, participantName) in answers" :key="participantName">
      <div class="answer" :aria-labelledby="'notification-label_' + answer">
        <div :id="'notification-label_' + answer">
          <span>{{ answer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextAnswerDisplay",
  props: ["answers"],
};
</script>

<style lang="scss" scoped>
.answer {
  margin-bottom: 5px;
}
</style>
