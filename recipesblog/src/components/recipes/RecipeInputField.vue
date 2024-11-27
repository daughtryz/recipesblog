<template>
  <div class="field is-horizontal mt-5">
    <div class="field-label is-normal">
      <label :for="labelNormalized" class="label">{{ labelName }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <input
          class="input"
          :type="type"
          @input="$emit('update:modelValue', $event.target.value)"
          :value="modelValue"
          :placeholder="placeholderName"
        />
        <div class="input-errors" v-for="error of errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "modelValue",
    "labelName",
    "placeholderName",
    "labelNormalized",
    "type",
    "errors",
  ],
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.input-errors {
  color: red;
}
</style>
