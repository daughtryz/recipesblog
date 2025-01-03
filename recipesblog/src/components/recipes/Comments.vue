<template>
  <article v-for="comment in comments" :key="comment.id" class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="comment.userImageUrl" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <template v-if="comment.isEditable">
          <form @submit.prevent="onEditSubmit(comment)">
            <EditComment v-model:content="comment.content">
              <template #errors>
                <ErrorMessages :errors="v$.selectedComment.content.$errors" />
              </template>
              <template #buttons>
                <p class="control">
                  <button type="submit" class="button is-success mr-3">
                    Save comment
                  </button>
                  <button class="button is-danger" @click="cancelEdit(comment)">
                    Cancel
                  </button>
                </p>
              </template>
            </EditComment>
          </form>
        </template>
        <template v-else>
          <p>
            <strong>{{ comment.username }}</strong>
            <br />
            {{ comment.content }}
            <br />
            <small><a>Like</a> · <a>Reply</a> · {{ comment.postTime }}</small>
          </p>
          <button v-if="comment.username === userStore.user.email" @click="comment.isEditable = true"
            class="button is-small is-success mr-2">
            Edit
          </button>
          <button v-if="comment.username === userStore.user.email" @click="isDeleteModeEnable = true"
            class="button is-small is-danger">
            Delete
          </button>
          <ModalDeleteComment @handle-delete-comment-id="handleDeleteCommentId" v-if="isDeleteModeEnable" v-model="isDeleteModeEnable" :recipe-id="recipeId"
            :comment-id="comment.id" />
        </template>
      </div>
    </div>
  </article>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";
import EditComment from "./EditComment.vue";
import { useCurrentTimeISO } from "@/composables/useCurrentTimeISO";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import ErrorMessages from "../ErrorMessages.vue";
import ModalDeleteComment from "./ModalDeleteComment.vue";
import { useUserStore } from "@/stores/storeAuth";

export default {
  components: {
    EditComment,
    ErrorMessages,
    ModalDeleteComment,
  },
  props: ["comments", "recipeId"],
  emits: ["handleDelete"],
  setup() {
    const recipeStore = useRecipeStore();
    const userStore = useUserStore();

    return {
      recipeStore,
      userStore,
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      isDeleteModeEnable: false,
      selectedComment: {
        content: "",
      },
    };
  },
  validations() {
    return {
      selectedComment: {
        content: {
          required: helpers.withMessage(
            "Cannot post empty comments!",
            required
          ),
        },
      },
    };
  },
  methods: {
    async onEditSubmit(comment) {
      this.selectedComment.content = comment.content;
      if (!(await this.v$.$validate())) {
        return;
      }

      const { currentISOTime } = useCurrentTimeISO();
      let postTime = currentISOTime;

      await this.recipeStore.editComment(
        this.recipeId,
        comment.id,
        comment.content,
        postTime
      );

      comment.cachedComment = comment.content;
      comment.isEditable = false;
    },
    cancelEdit(comment) {
      comment.content = comment.cachedComment;
      comment.isEditable = false;
    },
    handleDeleteCommentId(commentId) {
      this.$emit('handleDelete', commentId)
    }
  },
};
</script>
