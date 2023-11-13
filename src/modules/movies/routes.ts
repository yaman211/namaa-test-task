import { RouteRecordRaw } from 'vue-router';

export const moviesModuleRoutes: RouteRecordRaw = {
   path: 'movies',
   component: () => import('src/layouts/default-layout.vue'),
   redirect: '/movies/list',
   children: [
      {
         path: 'list',
         component: () => import('./pages/movies-list.vue'),
      },
      {
         path: 'create',
         component: () => import('./pages/movie-editor.vue'),
      },
      {
         path: 'edit/:id',
         props: true,
         component: () => import('./pages/movie-editor.vue'),
      },
      {
         path: ':id',
         props: true,
         component: () => import('./pages/movie-details.vue'),
      },
   ],
};
