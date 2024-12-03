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
    <div class="ml-3 mt-4 columns is-8">
      <div class="column is-2">
        <span @click="likeRecipe(recipeId)">
          <Transition mode="out-in">
            <i v-if="hasUserLiked" class="fa-solid fa-thumbs-up fa-2xl"></i>
            <i v-else class="fa-regular fa-thumbs-up fa-2xl"></i>
          </Transition>
        </span>
        <p class="mt-2">{{ recipe.likes }} likes</p>
      </div>
      <div class="column">
        <span> <i class="fa-regular fa-comment fa-2xl"></i></span>
      </div>
    </div>
    <footer v-if="userStore.user.id === recipe.user_id" class="card-footer">
      <EditRecipeButtonRouter :recipe-id="recipe.id" />
      <a @click.prevent="deleteRecipe = true" class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteRecipe
      v-if="deleteRecipe"
      v-model="deleteRecipe"
      :recipe-id="recipe.id"
    />
  </div>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
import EditRecipeButtonRouter from "@/components/recipes/EditRecipeButtonRouter.vue";
import ModalDeleteRecipe from "@/components/recipes/ModalDeleteRecipe.vue";
import { useUserStore } from "@/stores/storeAuth";
export default {
  components: {
    EditRecipeButtonRouter,
    ModalDeleteRecipe,
  },
  setup() {
    const recipeStore = useRecipeStore();
    const userStore = useUserStore();
    return { recipeStore, userStore };
  },
  data() {
    return {
      recipeId: this.$route.params.id,
      recipe: {},
      deleteRecipe: false,
    };
  },
  computed: {
    hasUserLiked() {
      return this.recipe.likedBy.find((x) => x === this.userStore.user.email);
    },
  },
  methods: {
    async likeRecipe() {
      this.recipe = await this.recipeStore.likeRecipe(
        this.recipeId,
        this.userStore.user.email
      );
    },
  },
  created() {
    this.recipe = this.recipeStore.getRecipeById(this.recipeId);
  },
};
</script>
<style scoped>
.enable-line-break {
  white-space: pre-wrap;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
