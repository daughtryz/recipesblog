<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card tweet-card">
        <div class="card-content">
          <Comments :recipe-id="recipeId" :comments="comments" v-on:handle-delete="handleDeleteComment" />
          <form ref="addCommentForm" @submit.prevent="onSubmit">
            <AddComment v-model="content">
              <template #errors>
                <ErrorMessages :errors="v$.content.$errors" />
              </template>
            </AddComment>
          </form>
        </div>
      </div>
    </div>
    <button
      @click="$emit('update:modelValue', false)"
      class="modal-close is-large"
      aria-label="close"
    ></button>
  </div>
</template>

<script>
import Comments from "./Comments.vue";
import AddComment from "./AddComment.vue";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/stores/storeAuth";
import { useRecipeStore } from "@/stores/storeRecipe";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import ErrorMessages from "../ErrorMessages.vue";
import { useCurrentTimeISO } from "@/composables/useCurrentTimeISO";

const defaultUserImage =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
export default {
  components: {
    Comments,
    AddComment,
    ErrorMessages,
  },
  props: ["modelValue", "recipeId"],
  emits: ["update:modelValue"],
  setup() {
    const userStore = useUserStore();
    const recipeStore = useRecipeStore();

    return {
      userStore,
      recipeStore,
      v$: useVuelidate({ $scope: false }),
    };
  },
  data() {
    return {
      content: "",
      comments: [],
      defaultUserImage,
    };
  },
  validations() {
    return {
      content: {
        required: helpers.withMessage("Cannot post empty comments!", required),
      },
    };
  },
  methods: {
    async onSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }
      const { currentISOTime } = useCurrentTimeISO();
      const comment = {
        id: uuidv4(),
        content: this.content,
        username: this.userStore.user.email,
        postTime: currentISOTime,
        replies: [],
        likes: 0,
        userImageUrl: this.userStore.user.photoURL ?? this.defaultUserImage,
      };

      this.$refs.addCommentForm.reset();
      await this.recipeStore.addComment(this.recipeId, comment);
      this.comments = this.recipeStore
        .getRecipeById(this.recipeId)
        .comments.map((obj) => ({ ...obj, isEditable: false }));
    },
    handleDeleteComment(commentId) {
      this.comments = this.comments.filter(comment => comment.id !== commentId)
    }
  },
  created() {
    this.comments = this.recipeStore
      .getRecipeById(this.recipeId)
      .comments
      .map((obj) => ({ ...obj, isEditable: false, cachedComment: obj.content }));
  },
};
</script>
<style scoped>
.tweet-card {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tweet-text {
  line-height: 1.5;
  color: #4a4a4a;
}

.icon-heart,
.icon-retweet {
  color: #1da1f2;
  margin-right: 10px;
  cursor: pointer;
}

.tweet-header {
  font-weight: bold;
}
</style>
