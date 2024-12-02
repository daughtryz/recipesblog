<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a @click.prevent="routeToRecipePage" class="navbar-item"><b>Recipes</b></a>
        <a class="navbar-item"><b>Statistics</b></a>
      </div>
      
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              v-if="!userStore.user.id"
              @click.prevent="routeToRegisterPage"
              class="button is-primary"
            >
              <strong>Sign up</strong>
            </a>
            <a
              v-if="!userStore.user.id"
              @click.prevent="routeToLoginPage"
              class="button is-light"
            >
              Log in
            </a>
            <template v-if="userStore.user.id">
              <button class="button">
                <span class="icon-text">
                  <span class="icon">
                    <i class="fa-solid fa-user"></i>
                  </span>
                  <span>{{ userStore.user.email }}</span>
                </span>
              </button>
              <a @click.prevent="logout" class="button is-light"> Log out </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/storeAuth";

export default {
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
  data() {
    return {};
  },
  methods: {
    routeToRegisterPage() {
      this.$router.push("auth/register");
    },
    routeToLoginPage() {
      this.$router.push("auth/login");
    },
    logout() {
      this.userStore.logout();
    },
    routeToRecipePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
