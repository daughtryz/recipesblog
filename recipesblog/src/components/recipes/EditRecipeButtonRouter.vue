<template>
  <button @click="routeToEditRecipeView" class="button is-primary">Edit</button>
</template>

<script>
export default {
  props: ['recipeId'],
  methods: {
    routeToEditRecipeView() {
      this.$router.push({ name: "editRecipe", params: { id: this.recipeId } });
    },
  },
};
</script>
