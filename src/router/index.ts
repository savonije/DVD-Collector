import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/404View.vue'),
        meta: { title: 'Oops! 404 Not Found - DVD Collection' },
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Home - DVD Collection' },
    },
    {
        path: '/movie/:name/:id',
        name: 'detail',
        component: () => import('@/views/DetailView.vue'),
        meta: { title: 'Movie Details - DVD Collection' },
    },
    {
        path: '/login',
        name: 'auth',
        component: () => import('@/views/AuthView.vue'),
        meta: { title: 'Login - DVD Collection' },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { top: 0 };
    },
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'detail') {
        const movieName = Array.isArray(to.params.name)
            ? to.params.name[0]
            : to.params.name;
        document.title = movieName
            ? `${movieName} - DVD Collection`
            : 'DVD Collection';
    } else {
        document.title =
            typeof to.meta?.title === 'string'
                ? to.meta.title
                : 'DVD Collection';
    }
    next();
});

export default router;
