<template>
  <div class="section">
    <div class="container">
      <!-- Recipe Card -->
      <div class="card">
        <!-- Recipe Image -->
        <div class="card-image">
          <figure class="image is-2by1">
            <img :src="recipe.image" :alt="recipe.name" />
          </figure>
        </div>

        <!-- Recipe Content -->
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <!-- Title and Time -->
              <p class="title is-4">{{ recipe.title }}</p>
              <p class="subtitle is-6">
                ⏱️ {{ recipe.hours }} : {{ recipe.minutes }} | 🍽️
                {{ recipe.servings }} servings
              </p>
            </div>
          </div>

          <!-- Ingredients and Directions -->
          <div class="columns">
            <!-- Ingredients -->
            <div class="column is-half">
              <table class="ml-5 table is-bordered">
                <thead>
                  <tr>
                    <th class="is-success">Ingredients</th>
                  </tr>
                </thead>
                <tbody
                  v-for="ingredient in recipe.ingredients"
                  :key="ingredient"
                >
                  <tr>
                    <td>
                      <i class="fa-solid fa-check"></i>
                      {{ ingredient }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Directions -->
            <div class="column is-half">
              <table class="ml-8 table is-bordered">
                <thead>
                  <tr>
                    <th class="is-success">Directions</th>
                  </tr>
                </thead>
                <tbody v-for="direction in recipe.directions" :key="direction">
                  <tr>
                    <td>
                      <i class="fa-solid fa-check"></i>
                      {{ direction }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Notes -->
          <article class="message is-success">
            <div class="message-header">
              <p>Notes</p>
            </div>
            <div class="message-body">
              {{ recipe.notes }}
            </div>
          </article>
        </div>

        <!-- Footer -->
        <footer class="card-footer">
          <span class="card-footer-item">
            <button @click="likeRecipe(recipeId)" class="button">
              <span class="icon">
                <Transition mode="out-in">
                  <i v-if="hasUserLiked" class="fa-solid fa-thumbs-up fa"></i>
                  <i v-else class="fa-regular fa-thumbs-up fa"></i>
                </Transition>
              </span>
              <span>{{ recipe.likes }} Likes</span>
            </button>
          </span>
          <span class="card-footer-item">
            <button class="button">
              <span class="icon">
                <i class="fas fa-comment"></i>
              </span>
              <span>Comment</span>
            </button>
          </span>
          <span
            v-if="userStore.user.id === recipe.user_id"
            class="card-footer-item"
          >
            <EditRecipeButtonRouter :recipe-id="recipe.id" />
          </span>
          <span
            v-if="userStore.user.id === recipe.user_id"
            class="card-footer-item"
          >
            <button @click="deleteRecipe = true" class="button is-danger">
              Delete
            </button>
          </span>
        </footer>
        <ModalDeleteRecipe
          v-if="deleteRecipe"
          v-model="deleteRecipe"
          :recipe-id="recipe.id"
        />
      </div>
    </div>
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
.card-content ul li,
.card-content ol li {
  margin: 0.5em 0;
}

.card-footer-item .button {
  display: flex;
  align-items: center;
}

.card-footer-item .button .icon {
  margin-right: 5px;
}
</style>
