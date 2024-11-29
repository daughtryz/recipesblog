<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="deleteModalMenuRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete recipe</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete it ?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button is-danger" @click="deleteRecipe">
            Delete
          </button>
          <button class="button" @click="closeModal">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from "@/stores/storeRecipe";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  recipeId: {
    required: true,
  },
});
const recipeStore = useRecipeStore();
const deleteRecipe = () => {
  recipeStore.deleteRecipe(props.recipeId);
  router.push({ path: "/" });
};
const emits = defineEmits(["update:modelValue"]);
const closeModal = () => {
  emits("update:modelValue", false);
};

</script>
