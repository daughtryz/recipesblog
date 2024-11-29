<template>
  <div class="card mt-5">
    <div class="grid ml-5 pt-6">
      <div class="cell">
        <img
          width="200"
          height="200"
          :src="recipe.image"
          alt="Placeholder image"
        />
      </div>
      <div class="cell is-family-monospace">
        <h1 class="title is-1">{{ recipe.name }}</h1>

        <div class="cell">
          <p>{{ recipe.servings }} serving</p>
        </div>
      </div>
      <div class="cell">
        <div class="content">
          <h4>
            <span class="icon">
              <i class="fas fa-clock"></i>
            </span>
            {{ recipe.hours }} hours {{ recipe.minutes }} minutes
          </h4>
        </div>
      </div>

      <div class="cell is-row-start-2">
        <div class="columns">
          <div class="content column">
            <h2>Ingredients</h2>
            <div class="fixed-grid has-1-cols">
              <div v-for="ingredient of recipe.ingredients" class="cell mb-3">
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>
                <em>{{ ingredient }}</em>
              </div>
            </div>
            <!-- <ul class="is-medium" v-for="ingredient of recipe.ingredients">
              <li>{{ ingredient }}</li>
            </ul> -->
          </div>
          <div class="content column">
            <h2>Directions</h2>
            <ul v-for="direction of recipe.directions">
              <li>{{ direction }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <h1>Notes</h1>
        {{ recipe.notes }}
      </div>
    </div>
    <footer class="card-footer">
      <EditRecipeButtonRouter :recipe-id="recipe.id" />
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
import EditRecipeButtonRouter from "@/components/recipes/EditRecipeButtonRouter.vue";

export default {
  components: {
    EditRecipeButtonRouter,
  },
  setup() {
    const recipeStore = useRecipeStore();
    return { recipeStore };
  },
  data() {
    return {
      recipe: {},
    };
  },
  methods: {},
  created() {
    const recipeId = this.$route.params.id;
    this.recipe = this.recipeStore.getRecipeById(recipeId);
    console.log(this.recipe);
  },
};
</script>
<style scoped>
.enable-line-break {
  white-space: pre-wrap;
}
</style>
