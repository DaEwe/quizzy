<template>
  <div>
    <h3>Please enter a Quiz Id to join!</h3>
    <div class="input-list">
      <div>
        <label for="quizIdInput">Quiz Id</label>
        <input type="text" v-model="quizId" id="quizIdInput" />
      </div>

      <div>
        <label for="nameInput">Name</label>
        <input type="text" v-model="name" id="nameInput" />
      </div>
      <button @click="join">
        Join!
      </button>
    </div>

  </div>
</template>
<script>
export default {
  name: "WelcomeDialog",
  data() {
    return {
      name: "",
      quizId: undefined,
    };
  },
  methods: {
    join() {
      this.$emit("join-clicked", { name: this.name, quizId: this.quizId });
      return true;
    },
  },
};
</script>
<style scoped>
.input-list {
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;

}

label {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 5px;
}
</style>