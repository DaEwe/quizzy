<template>
  <div>
    <div v-for="(count, number) in counts" :key="number">
      <div class="answer" :aria-labelledby="'notification-label_' + number">
        <div :id="'notification-label_' + number" class="answer-container">
          <span>{{ number }}</span>
          <span>({{ count }}x)</span>
        </div>
      </div>
    </div>
    <div>
      <div aria-labelledby="notification-label_avg">
        <div id="notification-label_avg">
          <span>Average: {{ avg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberAnswerDisplay",
  props: ["answers"],
  computed: {
    avg() {
      const values = Object.values(this.answers).map(Number);
      if (values.length > 0) {
        return values.reduce((x, y) => x + y) / values.length;
      } else return "-";
    },
    counts() {
      let counts = {};
      for (const number of Object.values(this.answers)) {
        if (typeof counts[number] === "undefined") {
          counts[number] = 0;
        }
        counts[number]++;
      }
      return counts;
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
