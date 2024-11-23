<template>
  <div class="navbar-item is-size-4 is-family-monospace">Recipes</div>
  <div class="fixed-grid has-3-cols">
    <div class="grid is-gap-5">
      <div v-for="recipe in recipes" :key="recipe.name" class="cell">
        <div class="card">
          <Recipe :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Recipe from "@/components/recipes/Recipe.vue";
const recipesConst = [
  {
    id: 1,
    name: "Musaka",
    servings: 2,
    hours: 2,
    minutes: 20,
    likes: 40,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note",
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 2,
    name: "Kavarma",
    servings: 3,
    hours: 4,
    minutes: 50,
    likes: 20,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 3,
    name: "Blister",
    servings: 4,
    hours: 4,
    minutes: 50,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    likes: 5,
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 4,
    name: "Blister2",
    servings: 5,
    hours: 4,
    minutes: 50,
    ingredients: ["butter", "suggar", "oat"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    likes: 100,
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 4,
    name: "Blister2",
    servings: 5,
    hours: 4,
    minutes: 50,
    ingredients: ["butter", "suggar", "oat"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    likes: 100,
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
];
export default {
  components: {
    Recipe,
  },
  data() {
    return {
      recipes: recipesConst
    };
  },
};
</script>
