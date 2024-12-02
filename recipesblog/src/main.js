import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores/storeAuth";
const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);

const userStore = useUserStore();
router.beforeEach((to, from) => {
  if (!userStore.user.id && to.name !== "loginPage") {
    return { name: "loginPage" };
  }
});

app.use(router);

app.mount("#app");
