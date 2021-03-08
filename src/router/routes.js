const routes = [
  {
    path: `/`,
    name: `index`,
    redirect: `/hitokoto`,
  },
  {
    path: `/hitokoto`,
    name: `hitokoto`,
    component: () => import(`/@/views/hitokoto`),
  },
];

export default routes;
