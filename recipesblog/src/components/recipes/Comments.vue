<template>
  <article v-for="comment in comments" :key="comment.postTime" class="media">
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
          <button
            @click="comment.isEditable = true"
            class="button is-small is-success mr-2"
          >
            Edit
          </button>
          <button
            @click="isDeleteModeEnable = true"
            class="button is-small is-danger"
          >
            Delete
          </button>
          <ModalDeleteComment
            v-if="isDeleteModeEnable"
            v-model="isDeleteModeEnable"
            :recipe-id="recipeId"
            :comment-id="comment.id"
          />
        </template>
      </div>

      <!-- <article class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img
                      src="https://bulma.io/assets/images/placeholders/96x96.png"
                    />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Sean Brown</strong>
                      <br />
                      Donec sollicitudin urna eget eros malesuada sagittis.
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Aliquam blandit nisl a
                      nulla sagittis, a lobortis leo feugiat.
                      <br />
                      <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                    </p>
                  </div>

                  <article class="media">
                    Vivamus quis semper metus, non tincidunt dolor. Vivamus in
                    mi eu lorem cursus ullamcorper sit amet nec massa.
                  </article>

                  <article class="media">
                    Morbi vitae diam et purus tincidunt porttitor vel vitae
                    augue. Praesent malesuada metus sed pharetra euismod. Cras
                    tellus odio, tincidunt iaculis diam non, porta aliquet
                    tortor.
                  </article>
                </div>
              </article> -->

      <!-- <article class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img
                      src="https://bulma.io/assets/images/placeholders/96x96.png"
                    />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Kayli Eunice </strong>
                      <br />
                      Sed convallis scelerisque mauris, non pulvinar nunc mattis
                      vel. Maecenas varius felis sit amet magna vestibulum
                      euismod malesuada cursus libero. Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices posuere cubilia
                      Curae; Phasellus lacinia non nisl id feugiat.
                      <br />
                      <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                    </p>
                  </div>
                </div>
              </article> -->
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

export default {
  components: {
    EditComment,
    ErrorMessages,
    ModalDeleteComment,
  },
  props: ["comments", "recipeId"],
  setup() {
    const recipeStore = useRecipeStore();

    return {
      recipeStore,
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
  },
};
</script>
