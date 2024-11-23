<template>
  <div class="card-image">
    <figure class="image is-16by9">
      <img :src="recipe.image" alt="Placeholder image" />
    </figure>
  </div>
  <div class="card-content">
    <div class="content">
      <h3>{{ recipe.name }}</h3>
      <div class="columns">
        <div class="column">
            <span class="icon">
                <i class="fa-solid fa-heart"></i>
            </span>
            {{ recipe.likes }}
        </div>
        <div class="column">
            <span class="icon">
              <i class="fas fa-clock"></i>
            </span>
            {{ recipe.hours }} hours {{ recipe.minutes }} minutes
        </div>
      </div>
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
  }
};
</script>
