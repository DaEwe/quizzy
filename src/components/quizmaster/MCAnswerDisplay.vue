<template>
  <div>
    <div v-for="(count, answer) in eval" :key="answer">
      <div class="answer" :aria-labelledby="'notification-label_' + answer">
        <div :id="'notification-label_' + answer" class="answer-container ">
          <span class="left">{{ answer }} </span>
          <span class="right">({{ count }}x)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MCAnswerDisplay",
  props: ["answers"],
  computed: {
    eval() {
      let summed = {};
      for (const answer of Object.values(this.answers)) {
        if (typeof summed[answer] === "undefined") {
          summed[answer] = 0;
        }
        summed[answer]++;
      }
      return summed;
    },
  },
};
</script>

<style lang="scss" scoped>
.answer {
  margin-bottom: 5px;
}

.answer-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
