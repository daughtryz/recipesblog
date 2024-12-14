import { defineStore } from "pinia";
import { db } from "@/js/firebase.js";
import { collection, getDocs } from "firebase/firestore";

let categoriesCollectionRef;
export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      categoriesCollectionRef = collection(db, "categories");
      const querySnapshot = await getDocs(categoriesCollectionRef);
      let currentCategories = [];
      querySnapshot.forEach((doc) => {
        let category = {
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image
        };
        currentCategories.push(category);
      });

      this.categories = currentCategories;
    },
    async init() {
        await this.getCategories();
    }
  },
});
