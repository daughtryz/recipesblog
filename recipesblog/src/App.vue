<template>
  <NavBar />
  <div class="container is-max-desktop">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/Layout/NavBar.vue';
export default {
  components: {
    NavBar
  }
}
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>