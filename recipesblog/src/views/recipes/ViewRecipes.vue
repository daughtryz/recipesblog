<template>
  <div class="navbar-item is-size-4 is-family-monospace">Recipes</div>
  <CategoryTabs v-on:select-category-name="onSelectCategoryNameHandler" />
  <div class="grid">
    <div class="cell">
      <SearchBar v-model="recipeName">
        <template #searchButton>
          <div class="control">
            <button @click="filterRecipeByName" class="button is-success">
              Search
            </button>
          </div>
        </template>
      </SearchBar>
    </div>
    <div class="cell">
      <AddRecipeButton />
    </div>
  </div>
  <div class="fixed-grid has-3-cols">
    <div class="grid is-gap-5">
      <div
        v-for="recipe in filteredRecipesByNameOrCategory"
        :key="recipe.name"
        class="cell"
      >
        <div class="card">
          <Recipe :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryTabs from "@/components/categories/CategoryTabs.vue";
import AddRecipeButton from "@/components/recipes/AddRecipeButtonRouter.vue";
import Recipe from "@/components/recipes/Recipe.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRecipeStore } from "@/stores/storeRecipe";
export default {
  components: {
    Recipe,
    SearchBar,
    CategoryTabs,
    AddRecipeButton,
  },
  setup() {
    const recipeStore = useRecipeStore();

    return { recipeStore };
  },
  data() {
    return {
      recipes: [],
      recipeName: "",
      selectedCategoryName: "",
    };
  },
  methods: {
    onSelectCategoryNameHandler(selectedCategoryName) {
      this.selectedCategoryName = selectedCategoryName;
    },
    filterRecipeByName() {
      this.recipeStore.getRecipeByName(this.recipeName);
      console.log("filtered");
    },
  },
  computed: {
    async filteredRecipesByNameOrCategory() {
      if (
        this.selectedCategoryName != ""
      ) {
        console.log('in the first  if');
        return await this.recipeStore.getRecipeByCategory(this.selectedCategoryName);
      }
      console.log('in the second  if')
      return this.recipeStore.recipes.filter((recipe) => {
        const matchesName = recipe.name
          .toLowerCase()
          .includes(this.recipeName.toLowerCase());

        // if (this.selectedCategoryName === "All") {
        //   this.selectedCategoryName = "";
        // }

        // const matchesCategory =
        //   this.selectedCategoryName === "" ||
        //   recipe.category === this.selectedCategoryName;

        return matchesName;
      });
    },
  },
};
</script>
