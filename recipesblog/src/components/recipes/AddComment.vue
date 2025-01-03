<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="userStore.user.photoURL ?? defaultUserImage" />
      </p>
    </figure>
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea
            @input="$emit('update:modelValue', $event.target.value)"
            class="textarea"
            placeholder="Add a comment..."
          ></textarea>
        </p>
        <slot name="errors" />
      </div>
      <div class="field">
        <p class="control">
          <button class="button">Post comment</button>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
const defaultUserImage =
"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";

import { useUserStore } from '@/stores/storeAuth';
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup() {
    const userStore = useUserStore();

    return {
      userStore
    }
  },
  data() {
    return {
      defaultUserImage
    }
  }
};
</script>
