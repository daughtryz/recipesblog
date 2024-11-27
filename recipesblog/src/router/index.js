import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ,
    {
      path: "/",
      name: "recipes",
      component: () => import("../views/recipes/ViewRecipes.vue"),
    },
    {
      path: "/recipes/details/:id",
      name: "recipeDetails",
      component: () => import("../views/recipes/ViewRecipeDetails.vue"),
    },
    {
      path: "/recipes/add",
      name: "addRecipe",
      component: () => import("../views/recipes/ViewAddRecipe.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
