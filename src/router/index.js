import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});
router.beforeEach((to, from, next) => {
  console.info(`<${from.name || ``}:${from.fullPath}> => <${to.name}:${to.fullPath}>`);
  next();
});
export default router;
