<template>
  <NavBar />
  <div class="container is-max-desktop">
    <RouterView />
  </div>
</template>

<script>
import NavBar from "./components/Layout/NavBar.vue";
import { useUserStore } from "./stores/storeAuth";
import { useRecipeStore } from "./stores/storeRecipe";
export default {
  components: {
    NavBar,
  },
  setup() {
    const storeRecipe = useRecipeStore();
    const storeAuth = useUserStore();
    return { storeRecipe, storeAuth };
  },
  async created() {
    await this.storeRecipe.init();
    this.storeAuth.init();
  },
};
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
