import { actorsModuleRoutes } from 'src/modules/actors/routes';
import { moviesModuleRoutes } from 'src/modules/movies/routes';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      component: () => import('layouts/main-layout.vue'),
      children: [actorsModuleRoutes, moviesModuleRoutes],
   },

   // Always leave this as last one,
   // but you can also remove it
   {
      path: '/:catchAll(.*)*',
      component: () => import('pages/error-not-found.vue'),
   },
];

export default routes;
