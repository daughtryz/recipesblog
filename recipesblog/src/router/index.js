import { useUserStore } from "@/stores/storeAuth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ,
    {
      path: "/",
      name: "recipes",
      component: () => import("../views/recipes/ViewRecipes.vue"),
    },
    {
      path: "/recipes",
      children: [
        {
          path: "details/:id",
          name: "recipeDetails",
          component: () => import("../views/recipes/ViewRecipeDetails.vue"),
        },
        {
          path: "edit/:id",
          name: "editRecipe",
          component: () => import("../views/recipes/ViewEditRecipe.vue"),
          beforeEnter: async () => {
            const store = useUserStore();
            if (!store.user.id) {
              const isLogged = await store.reAuthUser();
              if (!isLogged) {
                return { name: 'loginPage' };
              }
            }
          },
        },
        {
          path: "add",
          name: "addRecipe",
          component: () => import("../views/recipes/ViewAddRecipe.vue"),
          beforeEnter: async () => {
            const store = useUserStore();
            if (!store.user.id) {
              const isLogged = await store.reAuthUser();
              if (!isLogged) {
                return { name: 'loginPage' };
              }
            }
          },
        },
      ],
    },
    {
      path: '/user-profile',
      name: 'UserProfile',
      component: () => import("../views/users/UserProfile.vue"),
      beforeEnter: async () => {
        const store = useUserStore();
        if (!store.user.id) {
          const isLogged = await store.reAuthUser();
          if (!isLogged) {
            return { name: 'loginPage' };
          }
        }
      },
    },
    {
      path: "/auth",
      children: [
        {
          path: "register",
          name: "registerPage",
          component: () => import("../views/auth/ViewRegister.vue"),
        },
        {
          path: "login",
          name: "loginPage",
          component: () => import("../views/auth/ViewLogin.vue"),
        }
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("../views/common/NotFound.vue"),
    },
  ],
});

export default router;
