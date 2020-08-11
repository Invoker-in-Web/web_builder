const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
    ],
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
