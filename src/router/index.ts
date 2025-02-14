import { createRouter, createWebHistory } from 'vue-router';

import AuthView from '@/views/AuthView.vue';
import DetailView from '@/views/DetailView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/movie/:name/:id',
            name: 'detail',
            component: DetailView,
        },
        {
            path: '/login',
            name: 'auth',
            component: AuthView,
        },
    ],
});

export default router;
