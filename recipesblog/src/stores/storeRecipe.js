import { defineStore } from "pinia";

const recipesConst = [
  {
    id: 1,
    name: "Musaka",
    servings: 2,
    hours: 2,
    minutes: 20,
    categoryName: "Main course",
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
    categoryName: "Main course",
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
    categoryName: "Desserts",
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
    categoryName: "Desserts",
    ingredients: ["butter", "suggar", "oat"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    likes: 100,
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
  {
    id: 4,
    name: "Blister3",
    servings: 5,
    hours: 4,
    minutes: 50,
    categoryName: "Desserts",
    ingredients: ["butter", "suggar", "oat"],
    directions: ["first direction", "second direction"],
    notes: "Test note2",
    likes: 100,
    image: "https://www.supichka.com/files/images/1242/musaka_2.jpg",
  },
];
export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: recipesConst,
  }),
  actions: {
    getRecipes() {
      return this.recipes;
    },
    getRecipeById(recipeId) {
      return this.recipes.find((x) => x.id == recipeId);
    },
    addRecipe(recipe) {
      this.recipes.push(recipe);
    },
  },
});
