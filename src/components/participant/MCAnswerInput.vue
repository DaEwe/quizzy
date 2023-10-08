<template>
  <div class="mc-choices">
    <div v-for="(choice, idx)  in answer.options.mc_options" class="mc-choice" :key="idx">
      <input type="radio" :id="'radio_' + idx" name="radioSelect" @click="_ => $emit('answered', choice)" />
      <label :for="'radio_' + idx">{{ choice }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MCAnswerInput",
  props: ["answer"]
};
</script>

<style scoped>
.mc-choices {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px;
}

label {
  margin: 5px;
}
</style>