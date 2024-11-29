<template>
  <a @click.prevent="routeToEditRecipeView" class="card-footer-item">Edit</a>
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
