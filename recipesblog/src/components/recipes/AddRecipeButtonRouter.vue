<template>
  <button @click="routeToAddRecipeView" class="button is-primary is-rounded">
    <i class="fa-solid fa-plus"></i>
     Add recipe
  </button>
</template>

<script>
export default {
  methods: {
    routeToAddRecipeView() {
      this.$router.push("recipes/add");
    },
  },
};
</script>

<style scoped>
button {
  float: right;
}
</style>
