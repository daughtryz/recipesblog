<template>
  <div class="card-image">
    <figure class="image is-16by9">
      <img :src="recipe.image" alt="Placeholder image" />
    </figure>
  </div>
  <div class="card-content">
    <div class="content">
      {{ recipe.notes }}
    </div>
  </div>
  <footer class="card-footer">
    <RouterLink :to="`/recipes/details/${recipe.id}`" class="card-footer-item"
      >View Recipe</RouterLink
    >
  </footer>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
