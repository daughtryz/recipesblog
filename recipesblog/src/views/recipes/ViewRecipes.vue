<template>
  <div class="navbar-item is-size-4 is-family-monospace">Recipes</div>
  <div class="columns is-8">
    <div v-for="recipe in recipes" class="column">
      <div class="card">
        <Recipe :recipe="recipe" :key="recipe.name" />
      </div>
    </div>
  </div>
</template>

<script>
import Recipe from "@/components/recipes/Recipe.vue";
const recipesConst = [
  {
    id: 1,
    name: "Test Name",
    servings: 2,
    hours: 2,
    minutes: 20,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note",
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 2,
    name: "Test Name1",
    servings: 3,
    hours: 4,
    minutes: 50,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 3,
    name: "Test Name2",
    servings: 4,
    hours: 4,
    minutes: 50,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  }
];
export default {
  components: {
    Recipe,
  },
  data() {
    return {
      recipes: recipesConst,
    };
  },
};
</script>
