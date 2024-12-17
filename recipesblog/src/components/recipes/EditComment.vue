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
    <slot name="buttons" />
  </div>
</template>

<script>
export default {
  props: ["content"],
  emits: ["update:content"],
};
</script>
