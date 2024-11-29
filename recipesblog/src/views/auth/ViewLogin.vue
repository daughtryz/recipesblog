<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-widescreen">
            <form @submit.prevent="onSubmit" class="box">
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    v-model="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    v-model="password"
                    placeholder="*******"
                    class="input"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div class="field">
                <button type="submit" class="button is-success">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      console.log(credentials)
      this.userStore.loginUser(credentials);
    },
  },
};
</script>