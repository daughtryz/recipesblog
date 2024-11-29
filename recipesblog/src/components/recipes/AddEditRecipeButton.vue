<template>
  <div class="field is-horizontal">
    <div class="field-label"></div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <!-- <button type="submit" class="button is-primary">Add recipe</button> -->
           <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>
