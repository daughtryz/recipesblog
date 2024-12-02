<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item"> Recipes </a>

        <a class="navbar-item"> Documentation </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> About </a>
            <a class="navbar-item is-selected"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
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
    }
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
