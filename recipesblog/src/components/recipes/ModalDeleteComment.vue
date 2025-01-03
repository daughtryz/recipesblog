<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="deleteModalMenuRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete comment</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete it ?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button is-danger" @click="deleteComment">
            Delete
          </button>
          <button class="button" @click="$emit('update:modelValue', false)">
            Cancel
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
export default {
  setup() {
    const recipeStore = useRecipeStore();

    return {
      recipeStore,
    };
  },
  props: ["modelValue", "recipeId", "commentId"],
  emits: ["update:modelValue", "handleDeleteCommentId"],
  methods: {
    async deleteComment() {
      await this.recipeStore.deleteComment(this.recipeId, this.commentId);
      this.$emit("update:modelValue", false);
      this.$emit("handleDeleteCommentId", this.commentId);
    },
  },
};
</script>
