<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card tweet-card">
        <div class="card-content">
          <!-- List of all comments component -->
          <Comments :recipe-id="recipeId" />
          <!-- Post comment component -->
          <form @submit.prevent="onSubmit">
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
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      content: "",
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

      let postTime = this.getCurrentTimeISO();
      console.log("in the submit");
      console.log(this.userStore.user.email);
      const comment = {
        id: uuidv4(),
        content: this.content,
        username: this.userStore.user.email,
        postTime,
        replies: [],
        likes: 0,
        userImageUrl: this.defaultUserImage,
      };

      await this.recipeStore.addComment(this.recipeId, comment);
      this.content = "";
    },
    getCurrentTimeISO() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },
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
