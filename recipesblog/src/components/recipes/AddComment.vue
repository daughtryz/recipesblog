<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/assets/images/placeholders/128x128.png" />
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
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
