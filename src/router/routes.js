const _viewModules = import.meta.glob(`/src/views/**/*.vue`);
const views = {};
for (const path in _viewModules) {
  if (_viewModules.hasOwnProperty(path)) {
    // path like /src/views/a/../b.vue, we need key [a/...].
    const parts = path.split(`/`);
    // parts = ["", "src", "views", "a", ..., "b.vue"], dir path by slice [3, length-1]
    views[parts.slice(3, parts.length - 1).join(`/`)] = _viewModules[path];
  }
}

const routes = [
  {
    path: `/`,
    name: `index`,
    redirect: `/hitokoto`,
  },
  {
    path: `/hitokoto`,
    name: `hitokoto`,
    component: views[`hitokoto`],
  },
];

export default routes;
