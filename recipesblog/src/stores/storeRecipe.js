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
  setDoc,
  where,
} from "firebase/firestore";

let recipesCollectionRef;
let getRecipesSnapshot = null;
export const useRecipeStore = defineStore("recipeStore", {
  state: () => ({
    recipes: [],
  }),
  actions: {
    async getRecipes() {
      const unsubscribe = onSnapshot(recipesCollectionRef, (querySnapshot) => {
        let currentRecipes = [];
        querySnapshot.forEach((doc) => {
          let recipe = {
            id: doc.id,
            name: doc.data().name,
            servings: doc.data().servings,
            hours: doc.data().hours,
            minutes: doc.data().minutes,
            category: doc.data().category,
            ingredients: doc.data().ingredients,
            directions: doc.data().directions,
            notes: doc.data().notes,
            likes: doc.data().likes,
            image: doc.data().image,
            user_id: doc.data().user_id,
            likedBy: doc.data().likedBy,
          };
          currentRecipes.push(recipe);
        });
        this.recipes = currentRecipes;
      });
    },
    async getRecipeByName(name) {
      this.recipes = this.recipes.filter((recipe) => {
        const matchesName = recipe.name
          .toLowerCase()
          .includes(name.toLowerCase());
        return matchesName;
      });
    },
    async getRecipeByCategory(category) {
      const q = query(recipesCollectionRef, where("category", "==", category));
      const querySnapshot = await getDocs(q);
      let currentRecipes = [];
      querySnapshot.forEach((doc) => {
        let recipe = {
          id: doc.id,
          name: doc.data().name,
          servings: doc.data().servings,
          hours: doc.data().hours,
          minutes: doc.data().minutes,
          category: doc.data().category,
          ingredients: doc.data().ingredients,
          directions: doc.data().directions,
          notes: doc.data().notes,
          likes: doc.data().likes,
          image: doc.data().image,
          user_id: doc.data().user_id,
          likedBy: doc.data().likedBy,
        };
        currentRecipes.push(recipe);
      });
      console.log(currentRecipes);
      this.recipes = currentRecipes;
    },
    getRecipeById(recipeId) {
      return this.recipes.find((x) => x.id == recipeId);
    },
    async addRecipe(recipe) {
      var currentDate = new Date().getTime();
      let createdAt = currentDate.toString();
      recipe.createdAt = createdAt;

      await setDoc(doc(recipesCollectionRef, recipe.id), recipe);
    },
    loadQuerySnapshot(querySnapshot) {},
    async editRecipe(recipeToEdit) {
      const currentRecipe = this.recipes.find((x) => x.id == recipeToEdit.id);
      currentRecipe.name = recipeToEdit.name;
      currentRecipe.servings = recipeToEdit.servings;
      currentRecipe.hours = recipeToEdit.hours;
      currentRecipe.minutes = recipeToEdit.minutes;
      currentRecipe.category = recipeToEdit.category;
      currentRecipe.ingredients = recipeToEdit.ingredients;
      currentRecipe.directions = recipeToEdit.directions;
      currentRecipe.notes = recipeToEdit.notes;
      currentRecipe.image = recipeToEdit.image;

      await updateDoc(
        doc(recipesCollectionRef, recipeToEdit.id),
        currentRecipe
      );
    },
    async likeRecipe(recipeId, userEmail) {
      const currentRecipe = this.recipes.find((x) => x.id == recipeId);
      const user = currentRecipe.likedBy.find((x) => x === userEmail);

      if (user) {
        currentRecipe.likes -= 1;
        currentRecipe.likedBy.shift(userEmail);
      } else {
        currentRecipe.likes += 1;
        currentRecipe.likedBy.push(userEmail);
      }

      await updateDoc(doc(recipesCollectionRef, recipeId), currentRecipe);

      return currentRecipe;
    },
    async deleteRecipe(recipeId) {
      await deleteDoc(doc(recipesCollectionRef, recipeId));
    },
    async init() {
      recipesCollectionRef = collection(db, "recipes");
      await this.getRecipes();
    },
  },
});
