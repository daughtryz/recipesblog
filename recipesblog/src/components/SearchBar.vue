<template>
  <div class="field has-addons">
    <div class="control has-icons-right">
      <input
        class="input is-rounded"
        type="text"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search a recipe"
      />
      <span class="icon is-right">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    props: ['update:modelValue']
};
</script>