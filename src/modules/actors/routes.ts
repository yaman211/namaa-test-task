import { RouteRecordRaw } from 'vue-router';

export const actorsModuleRoutes: RouteRecordRaw = {
   path: 'actors',
   component: () => import('src/layouts/default-layout.vue'),
   redirect: '/actors/list',
   children: [
      {
         path: 'list',
         component: () => import('./pages/actors-list.vue'),
      },
   ],
};
