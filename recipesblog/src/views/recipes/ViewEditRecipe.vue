<template>
  <form @submit.prevent="onSubmit">
    <RecipeInputField type="text" :errors="v$.recipeToEdit.name.$errors" label-name="Recipe name"
      v-model="recipeToEdit.name" label-normalized="recipeName" placeholder-name="Enter recipe name" />

    <RecipeInputField type="text" :errors="v$.recipeToEdit.image.$errors" label-name="Image URL"
      v-model="recipeToEdit.image" label-normalized="recipeName" placeholder-name="Enter image url" />

    <RecipeInputField type="number" :errors="v$.recipeToEdit.servings.$errors" label-name="Servings"
      v-model="recipeToEdit.servings" label-normalized="servings" placeholder-name="Enter servings" />

    <RecipeInputField type="number" :errors="v$.recipeToEdit.hours.$errors" label-name="Hours"
      v-model="recipeToEdit.hours" label-normalized="hours" placeholder-name="Enter hours" />

    <RecipeInputField type="number" label-name="Minutes" :errors="v$.recipeToEdit.minutes.$errors"
      v-model="recipeToEdit.minutes" label-normalized="minutes" placeholder-name="Enter minutes" />

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Category</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="recipeToEdit.category">
                <option selected disabled hidden value="">
                  Choose category
                </option>
                <option v-for="category in categoryStore.categories">
                  {{ category.name }}
                </option>
              </select>
              <div class="input-errors" v-for="error of v$.recipeToEdit.category.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <RecipeInputField type="text" :errors="v$.recipeToEdit.ingredients.$errors" label-name="Ingredients"
      v-model="recipeToEdit.currentIngredient" label-normalized="ingredients"
      placeholder-name="Enter ingredients e.g. butter, milk">
      <template #ingredient>
        <div class="columns">
          <div class="content column">
            <div class="fixed-grid has-1-cols">
              <div v-for="ingredient of recipeToEdit.ingredients" class="cell mb-3">
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>
                <em>{{ ingredient }}</em>
                <span @click.prevent="removeIngredient(ingredient)">
                  <i class="fa-solid fa-trash fa-sm ml-1"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <button @click.prevent="addIngredient" class="button is-primary is-small is-responsive">
          Add ingredient
        </button>
      </template>
    </RecipeInputField>

    <RecipeInputField type="text" :errors="v$.recipeToEdit.directions.$errors" label-name="Directions"
      v-model="recipeToEdit.currentDirection" label-normalized="directions"
      placeholder-name="Enter directions e.g. prepare sauce pan, use hot water">
      <template #direction>
        <div class="columns">
          <div class="content column">
            <div class="fixed-grid has-1-cols">
              <div v-for="direction of recipeToEdit.directions" class="cell mb-3">
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>
                <em>{{ direction }}</em>
                <span @click.prevent="removeDirection(direction)">
                  <i class="fa-solid fa-trash fa-sm ml-1"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <button @click.prevent="addDirection" class="button is-primary is-small is-responsive">
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
            <textarea class="textarea" v-model="recipeToEdit.notes"
              placeholder="Additional quote to the recipe"></textarea>
          </div>
        </div>
      </div>
    </div>

    <AddEditRecipeButton>
      <template #buttons>
        <button type="submit" class="button is-primary">Edit recipe</button>
      </template>
    </AddEditRecipeButton>
  </form>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
import { useVuelidate } from "@vuelidate/core";
import { required, between, minValue, helpers } from "@vuelidate/validators";
import RecipeInputField from "@/components/recipes/RecipeInputField.vue";
import AddEditRecipeButton from "@/components/recipes/AddEditRecipeButton.vue";
import { useCategoryStore } from "@/stores/storeCategory";

const isIngredientsNotEmpty = helpers.withMessage(
  "Ingredients must have at least one value",
  (value) => Array.isArray(value) && value.some((item) => item.trim() !== "") // Check if there's at least one non-empty item
);

const isDirectionsNotEmpty = helpers.withMessage(
  "Directions must have at least one value",
  (value) => Array.isArray(value) && value.some((item) => item.trim() !== "") // Check if there's at least one non-empty item
);

export default {
  components: {
    RecipeInputField,
    AddEditRecipeButton,
  },
  setup() {
    const recipeStore = useRecipeStore();
    const categoryStore = useCategoryStore();

    return {
      recipeStore,
      categoryStore,
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      isEditMode: false,
      recipeToEdit: {
        name: "",
        servings: 0,
        hours: 0,
        minutes: 0,
        category: "",
        ingredients: [],
        currentIngredient: "",
        directions: [],
        currentDirection: "",
        notes: "",
        image: "",
      },
    };
  },
  validations() {
    return {
      recipeToEdit: {
        name: { required },
        servings: { required, minValueValue: minValue(1) },
        hours: { required, betweenValue: between(1, 60) },
        minutes: { required, betweenValue: between(1, 60) },
        category: { required },
        ingredients: { isIngredientsNotEmpty },
        directions: { isDirectionsNotEmpty },
        image: { required },
      },
    };
  },
  methods: {
    async onSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      await this.recipeStore.editRecipe(this.recipeToEdit);
      this.$router.push("/");
    },
    addIngredient() {
      this.recipeToEdit.ingredients.push(this.recipeToEdit.currentIngredient);
      this.recipeToEdit.currentIngredient = "";
    },
    addDirection() {
      this.recipeToEdit.directions.push(this.recipeToEdit.currentDirection);
      this.recipeToEdit.currentDirection = "";
    },
    removeIngredient(ingredient) {
      this.recipeToEdit.ingredients = this.recipeToEdit.ingredients.filter(ing => ing !== ingredient);
    },
    removeDirection(direction) {
      this.recipeToEdit.directions = this.recipeToEdit.directions.filter(dir => dir !== direction);
    }
  },
  created() {
    const recipeId = this.$route.params.id;
    this.recipeToEdit = this.recipeStore.getRecipeById(recipeId);
  },
};
</script>
