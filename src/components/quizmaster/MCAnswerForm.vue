<template>
  <div class="mc-answer-container">
    <div @input="$emit('update:modelValue', modelValue)">
      <div v-for="(option, idx) in modelValue.mc_options" :key="idx">
        <div>
          <label for="idx">Answer Text</label>
          <input type="text" v-model="modelValue.mc_options[idx]" id="idx" />
        </div>
      </div>
    </div>
    <button @click="add">
      Add Option
    </button>
  </div>
</template>
<script>
export default {

  name: "MCAnswerForm",
  props: ["modelValue"],
  created() {
    if (!("mc_options" in this.modelValue)) {
      this.modelValue["mc_options"] = [];
    }
  },
  methods: {
    add() {
      this.modelValue.mc_options.push("");
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 5px;
}

.mc-answer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin: 5px;
}
</style>