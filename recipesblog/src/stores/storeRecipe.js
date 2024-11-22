import { defineStore } from "pinia";

const recipesConst = [
  {
    id: 1,
    name: "Musaka",
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
    name: "Musaka1",
    servings: 3,
    hours: 4,
    minutes: 50,
    ingredients: ["butter", "suggar"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
];
export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: recipesConst,
  }),
  actions: {
    getRecipeById(recipeId) {
      return this.recipes.find((x) => x.id == recipeId);
    },
  },
});
