import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import { Routes } from "../types/router";

const { Dashboard, Login, People, Add } = Routes;
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
  },
  {
    path: "/people",
    name: People,
    component: () => import("@/views/People.vue")
  },
  {
    path: "/add",
    name: Add,
    component: () => import("@/views/Add.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  console.log("to", to.fullPath, "from", from.fullPath, "loggedIn", isLoggedIn);
  if (to.name === Login) {
    if (isLoggedIn) return next({ name: Dashboard });
    return next();
  }
  if (isLoggedIn) return next();
  return next({ name: Login });
});

export default router;
