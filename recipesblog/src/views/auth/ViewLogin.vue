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
                    @blur="v$.email.$touch"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                  <ErrorMessages :errors="v$.email.$errors" />
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    v-model="password"
                    @blur="v$.password.$touch"
                    placeholder="*******"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                  <ErrorMessages :errors="v$.password.$errors" />
                </div>
              </div>
              <p
                class="invalid-credentials"
                v-if="this.userStore.invalidCredentials"
              >
                {{ this.userStore.invalidCredentials }}
              </p>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div class="field">
                <p>
                  If you don't have an account, you can sign up from
                  <RouterLink to="/auth/register">here</RouterLink>
                </p>
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
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  email,
  alphaNum,
  maxLength,
} from "@vuelidate/validators";
import ErrorMessages from "@/components/ErrorMessages.vue";

export default {
  components: {
    ErrorMessages,
  },
  setup() {
    const userStore = useUserStore();

    return { userStore, v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("Email is required", required),
        email,
      },
      password: {
        required: helpers.withMessage("Password is required", required),
        minLength: minLength(6),
        maxLength: maxLength(15),
        alphaNum,
      },
    };
  },
  methods: {
    async onSubmit() {
      if (!(await this.v$.$validate())) {
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.userStore.loginUser(credentials);
    },
  },
};
</script>

<style scoped>
.invalid-credentials {
  color: red;
}
</style>
