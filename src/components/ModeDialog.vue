<template>
  <div>
    <h2>What do you want to do?</h2>
    <div>
      <div class="dialog-buttons">
        <button type="button" @click="$emit('chosen', 'Participant')">
          Take part in Quiz
        </button>
        <button type="button" @click="$emit('chosen', 'Quizmaster')">
          Host a new Quiz
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModeDialog",
};
</script>
