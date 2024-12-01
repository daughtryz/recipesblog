<template>
  <form @submit.prevent="onSubmit">
    <RecipeInputField
      type="text"
      :errors="v$.recipeToEdit.name.$errors"
      label-name="Recipe name"
      v-model="recipeToEdit.name"
      label-normalized="recipeName"
      placeholder-name="Enter recipe name"
    />

    <RecipeInputField
      type="text"
      :errors="v$.recipeToEdit.image.$errors"
      label-name="Image URL"
      v-model="recipeToEdit.image"
      label-normalized="recipeName"
      placeholder-name="Enter image url"
    />

    <RecipeInputField
      type="number"
      :errors="v$.recipeToEdit.servings.$errors"
      label-name="Servings"
      v-model="recipeToEdit.servings"
      label-normalized="servings"
      placeholder-name="Enter servings"
    />

    <RecipeInputField
      type="number"
      :errors="v$.recipeToEdit.hours.$errors"
      label-name="Hours"
      v-model="recipeToEdit.hours"
      label-normalized="hours"
      placeholder-name="Enter hours"
    />

    <RecipeInputField
      type="number"
      label-name="Minutes"
      :errors="v$.recipeToEdit.minutes.$errors"
      v-model="recipeToEdit.minutes"
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
              <select v-model="recipeToEdit.categoryName">
                <option selected disabled hidden value="">
                  Choose a category
                </option>
                <option v-for="category in categories">
                  {{ category }}
                </option>
              </select>
              <div
                class="input-errors"
                v-for="error of v$.recipeToEdit.categoryName.$errors"
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
      :errors="v$.recipeToEdit.ingredients.$errors"
      label-name="Ingredients"
      v-model="recipeToEdit.ingredients"
      label-normalized="ingredients"
      placeholder-name="Enter ingredients e.g. butter, milk"
    />

    <RecipeInputField
      type="text"
      :errors="v$.recipeToEdit.directions.$errors"
      label-name="Directions"
      v-model="recipeToEdit.directions"
      label-normalized="directions"
      placeholder-name="Enter directions e.g. prepare sauce pan, use hot water"
    />

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Notes</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              v-model="recipeToEdit.notes"
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
        <button type="submit" class="button is-primary">Edit recipe</button>
      </template>
    </AddEditRecipeButton>
  </form>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
import { useVuelidate } from "@vuelidate/core";
import { required, between, minValue } from "@vuelidate/validators";
import RecipeInputField from "@/components/recipes/RecipeInputField.vue";
import AddEditRecipeButton from "@/components/recipes/AddEditRecipeButton.vue";

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
      recipeToEdit: {
        name: "",
        servings: 0,
        hours: 0,
        minutes: 0,
        categoryName: "",
        ingredients: [],
        directions: [],
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
        categoryName: { required },
        ingredients: { required },
        directions: { required },
        image: { required },
      },
    };
  },
  methods: {
    async onSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }
      const ingredients = this.recipeToEdit.ingredients
        .split(",")
        .map((i) => i.trim());

      console.log(ingredients)
      // const directions = this.recipeToEdit.directions
      //   .split(",")
      //   .map((i) => i.trim());

      // this.recipeToEdit.ingredients = ingredients;
      // this.recipeToEdit.directions = directions;

      await this.recipeStore.editRecipe(this.recipeToEdit);
      this.$router.push("/");
    },
  },
  created() {
    const recipeId = this.$route.params.id;
    this.recipeToEdit = this.recipeStore.getRecipeById(recipeId);
  },
};
</script>
