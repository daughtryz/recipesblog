<template>
  <NavBar />
  <div class="container is-max-desktop">
    <RouterView />
  </div>
  <Footer />
</template>

<script>
import NavBar from "./components/Layout/NavBar.vue";
import { useUserStore } from "./stores/storeAuth";
import { useRecipeStore } from "./stores/storeRecipe";
import { useCategoryStore } from "./stores/storeCategory";
import Footer from "./components/Layout/Footer.vue";

export default {
  components: {
    NavBar,
    Footer
  },
  setup() {
    const storeRecipe = useRecipeStore();
    const storeAuth = useUserStore();
    const categoryStore = useCategoryStore();
    return { storeRecipe, storeAuth, categoryStore };
  },
  async created() {
    await this.storeRecipe.init();
    await this.categoryStore.init();
    this.storeAuth.init();
  },
};
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
