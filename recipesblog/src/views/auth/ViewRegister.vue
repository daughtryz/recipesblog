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
                <label for="" class="label">Username</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    v-model="username"
                    placeholder="e.g. bobsmith"
                    @blur="v$.username.$touch"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                  <ErrorMessages :errors="v$.username.$errors" />
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    v-model="password"
                    placeholder="*******"
                    @blur="v$.password.$touch"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                  <ErrorMessages :errors="v$.password.$errors" />
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Confirm password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    v-model="confirmPassword"
                    placeholder="*******"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                  <ErrorMessages :errors="v$.confirmPassword.$errors" />
                </div>
              </div>
              <div class="field">
                <button type="submit" class="button is-success">
                  Register
                </button>
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
  between,
  minValue,
  helpers,
  minLength,
  sameAs,
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  validations() {
    return {
      username: {
        required: helpers.withMessage("Username is required", required),
      },
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
      confirmPassword: {
        sameAsPassword: helpers.withMessage(
          "Password and confirm password do not match",
          sameAs(this.password)
        ),
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
        username: this.username,
        password: this.password,
      };
      console.log(credentials);
      this.userStore.registerUser(credentials);
      this.$router.push({ name: "loginPage" });
    },
  },
};
</script>
