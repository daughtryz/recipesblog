<template>
  <NavBar />
  <div class="container is-max-desktop">
    <RouterView />
  </div>
</template>

<script>
import NavBar from "./components/Layout/NavBar.vue";
import { useRecipeStore } from "./stores/storeRecipe";
export default {
  components: {
    NavBar,
  },
  setup() {
    const storeRecipe = useRecipeStore();

    return { storeRecipe };
  },
  async created() {
    await this.storeRecipe.init();
  },
};
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
