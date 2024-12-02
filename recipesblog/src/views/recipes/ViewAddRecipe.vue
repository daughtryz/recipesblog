<template>
  <form @submit.prevent="onSubmit">
    <RecipeInputField
      type="text"
      :errors="v$.name.$errors"
      label-name="Recipe name"
      v-model="name"
      label-normalized="recipeName"
      placeholder-name="Enter recipe name"
    />

    <RecipeInputField
      type="text"
      :errors="v$.image.$errors"
      label-name="Image URL"
      v-model="image"
      label-normalized="recipeName"
      placeholder-name="Enter image url"
    />

    <RecipeInputField
      type="number"
      :errors="v$.servings.$errors"
      label-name="Servings"
      v-model="servings"
      label-normalized="servings"
      placeholder-name="Enter servings"
    />

    <RecipeInputField
      type="number"
      :errors="v$.hours.$errors"
      label-name="Hours"
      v-model="hours"
      label-normalized="hours"
      placeholder-name="Enter hours"
    />

    <RecipeInputField
      type="number"
      :errors="v$.minutes.$errors"
      label-name="Minutes"
      v-model="minutes"
      label-normalized="minutes"
      placeholder-name="Enter minutes"
    />

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Category</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="selectedCategory">
                <option selected disabled hidden value="">
                  Choose a category
                </option>
                <option v-for="category in categories">
                  {{ category }}
                </option>
              </select>
              <div
                class="input-errors"
                v-for="error of v$.selectedCategory.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <RecipeInputField
      type="text"
      :errors="v$.ingredients.$errors"
      label-name="Ingredients"
      v-model="currentIngredient"
      label-normalized="ingredients"
      placeholder-name="Enter ingredients e.g. butter, milk"
    >
      <template #ingredient>
        <div class="columns">
          <div class="content column">
            <div class="fixed-grid has-1-cols">
              <div v-for="ingredient of ingredients" class="cell mb-3">
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>
                <em>{{ ingredient }}</em>
              </div>
            </div>
          </div>
        </div>
        <button
          @click.prevent="addIngredient"
          class="button is-primary is-small is-responsive"
        >
          Add ingredient
        </button>
      </template>
    </RecipeInputField>

    <RecipeInputField
      type="text"
      :errors="v$.directions.$errors"
      label-name="Directions"
      v-model="currentDirection"
      label-normalized="directions"
      placeholder-name="Enter directions e.g. prepare sauce pan, use hot water"
    >
      <template #direction>
        <div class="columns">
          <div class="content column">
            <div class="fixed-grid has-1-cols">
              <div v-for="direction of directions" class="cell mb-3">
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>
                <em>{{ direction }}</em>
              </div>
            </div>
          </div>
        </div>
        <button
          @click.prevent="addDirection"
          class="button is-primary is-small is-responsive"
        >
          Add direction
        </button>
      </template>
    </RecipeInputField>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Notes</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              v-model="notes"
              placeholder="Additional quote to the recipe"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="file is-primary is-right">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label"> Upload a recipe image… </span>
        </span>
      </label>
    </div>

    <AddEditRecipeButton>
      <template #buttons>
        <button type="submit" class="button is-primary">Add recipe</button>
      </template>
    </AddEditRecipeButton>
  </form>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
import { v4 as uuidv4 } from "uuid";
import { useVuelidate } from "@vuelidate/core";
import { required, between, minValue, helpers } from "@vuelidate/validators";
import RecipeInputField from "@/components/recipes/RecipeInputField.vue";
import AddEditRecipeButton from "@/components/recipes/AddEditRecipeButton.vue";

const isIngredientsNotEmpty = helpers.withMessage(
  "Ingredients must have at least one value",
  (value) => Array.isArray(value) && value.some((item) => item.trim() !== "") // Check if there's at least one non-empty item
);

const isDirectionsNotEmpty = helpers.withMessage(
  "Directions must have at least one value",
  (value) => Array.isArray(value) && value.some((item) => item.trim() !== "") // Check if there's at least one non-empty item
);

const categories = [
  "Salads",
  "Main course",
  "Bakery",
  "Soups",
  "Desserts",
  "Drinks",
];

export default {
  components: {
    RecipeInputField,
    AddEditRecipeButton,
  },
  setup() {
    const recipeStore = useRecipeStore();

    return {
      recipeStore,
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      categories,
      name: "",
      servings: 0,
      hours: 0,
      minutes: 0,
      selectedCategory: "",
      ingredients: [],
      currentIngredient: "",
      directions: [],
      currentDirection: "",
      notes: "",
      image: "",
    };
  },
  validations() {
    return {
      name: { required },
      servings: { required, minValueValue: minValue(1) },
      hours: { required, betweenValue: between(1, 60) },
      minutes: { required, betweenValue: between(1, 60) },
      selectedCategory: { required },
      ingredients: { isIngredientsNotEmpty },
      directions: { isDirectionsNotEmpty },
      image: { required },
    };
  },
  methods: {
    async onSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      const recipe = {
        id: uuidv4(),
        name: this.name,
        servings: this.servings,
        hours: this.hours,
        minutes: this.minutes,
        category: this.selectedCategory,
        ingredients: this.ingredients,
        directions: this.directions,
        notes: this.notes,
        image: this.image,
        likes: 0,
      };
      
      await this.recipeStore.addRecipe(recipe);
      this.$router.push("/");
    },
    addIngredient() {
      this.ingredients.push(this.currentIngredient);
      this.currentIngredient = "";
    },
    addDirection() {
      this.directions.push(this.currentDirection);
      this.currentDirection = "";
    },
  },
};
</script>

<style scoped>
.input-errors {
  color: red;
}
</style>
