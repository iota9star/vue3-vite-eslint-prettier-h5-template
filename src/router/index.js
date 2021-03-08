import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  console.info(`<${from.name || ``}:${from.fullPath}> => <${to.name}:${to.fullPath}>`);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
