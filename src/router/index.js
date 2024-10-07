import { createRouter, createWebHistory } from "vue-router";
import XBoxView from "../views/XBoxView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: XBoxView,
      // component: EntryView
    },
    {
      path: "/Xbox",
      name: "Xbox",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/XBoxView.vue"),
    },
  ],
});

export default router;
