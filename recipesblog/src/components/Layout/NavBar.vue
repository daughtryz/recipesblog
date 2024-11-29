<template>
<nav class="navbar is-success" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Recipes
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item is-selected">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a @click.prevent="routeToRegisterPage" class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a @click.prevent="routeToLoginPage" class="button is-light">
            Log in
          </a>
          <a class="button is-light">
            Log out
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
      routeToRegisterPage() {
        this.$router.push('/auth/register')
      },
      routeToLoginPage() {
        this.$router.push('/auth/login')
      }
    }
}
</script>

<style>
@media(max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>