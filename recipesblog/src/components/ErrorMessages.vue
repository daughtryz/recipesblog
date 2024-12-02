<template>
  <div class="input-errors" v-for="error of errors" :key="error.$uid">
    <div class="error-msg">{{ error.$message }}</div>
  </div>
</template>

<script>
export default {
  props: ["errors"],
};
</script>

<style scoped>
.input-errors {
  color: red;
}
</style>
