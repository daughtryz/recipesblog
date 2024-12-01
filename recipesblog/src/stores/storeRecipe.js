import { defineStore } from "pinia";
import { db } from "@/js/firebase.js";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
  getDocs,
} from "firebase/firestore";

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
let recipesCollectionRef;
let getRecipesSnapshot = null;
export const useRecipeStore = defineStore("recipeStore", {
  state: () => ({
    recipes: [],
  }),
  actions: {
    async getRecipes() {
      getRecipesSnapshot = onSnapshot(recipesCollectionRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let recipe = {
            id: doc.id,
            name: doc.data().name,
            servings: doc.data().servings,
            hours: doc.data().hours,
            minutes: doc.data().minutes,
            categoryName: doc.data().categoryName,
            ingredients: doc.data().ingredients,
            directions: doc.data().directions,
            notes: doc.data().notes,
            likes: doc.data().likes,
            image: doc.data().image,
          };
          this.recipes.push(recipe);
        });
      });
    },
    getRecipeById(recipeId) {
      return this.recipes.find((x) => x.id == recipeId);
    },
    async addRecipe(recipe) {
      var currentDate = new Date().getTime();
      let createdAt = currentDate.toString();
      recipe.createdAt = createdAt;
      await addDoc(recipesCollectionRef, recipe);
    },
    async editRecipe(recipeToEdit) {
      const currentRecipe = this.recipes.find((x) => x.id == recipeToEdit.id);
      currentRecipe.name = recipeToEdit.name;
      currentRecipe.servings = recipeToEdit.servings;
      currentRecipe.hours = recipeToEdit.hours;
      currentRecipe.minutes = recipeToEdit.minutes;
      currentRecipe.categoryName = recipeToEdit.categoryName;
      currentRecipe.ingredients = recipeToEdit.ingredients;
      currentRecipe.directions = recipeToEdit.directions;
      currentRecipe.notes = recipeToEdit.notes;
      currentRecipe.image = recipeToEdit.image;

      await updateDoc(doc(db, 'recipes', recipeToEdit.id), currentRecipe);
    },
    deleteRecipe(recipeId) {
      const currentRecipe = this.recipes.find((x) => x.id == recipeId);
      this.recipes.shift(currentRecipe);
    },
    async init() {
      recipesCollectionRef = collection(db, "recipes");
      await this.getRecipes();
    },
  },
});
