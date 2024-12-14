<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        @click.prevent="showMobileNav = !showMobileNav"
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': showMobileNav }"
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
    <div
      id="navbarBasicExample"
      :class="{ 'is-active': showMobileNav }"
      class="navbar-menu"
      ref="navbarMenuRef"
    >
      <div class="navbar-start">
        <a @click.prevent="routeToRecipePage" class="navbar-item"
          ><b>Recipes</b></a
        >
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
    return {
      showMobileNav: false,
    };
  },
  methods: {
    routeToRegisterPage() {
      this.$router.push({name: 'registerPage'});
    },
    routeToLoginPage() {
      this.$router.push({name: 'loginPage'});
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

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
