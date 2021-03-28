import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import { Routes } from "../types/router";

const { Dashboard, Login } = Routes;
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Dashboard,
    component: () => import("@/views/Dashboard.vue")
  },
  {
    path: "/login",
    name: Login,
    component: () => import("@/views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  console.log("to", to.fullPath, "loggedIn", isLoggedIn);
  if (to.name === Login) {
    if (isLoggedIn) return next({ name: Dashboard });
    return next();
  }
  if (isLoggedIn) return next();
  return next({ name: Login });
});

export default router;
