<template>
  <div class="field">
    <p class="control">
      <textarea
        @input="$emit('update:content', $event.target.value)"
        :value="content"
        class="textarea"
        placeholder="Edit a comment..."
      ></textarea>
    </p>
    <slot name="errors" />
  </div>
  <div class="field">
    <p class="control">
      <button class="button is-success mr-3">Save comment</button>
      <button
        class="button is-danger"
        @click="$emit('update:isEditable', false)"
      >
        Cancel
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: ["content", "isEditable"],
  emits: ["update:content", "update:isEditable"],
};
</script>
