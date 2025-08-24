import '@/assets/main.css';

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import { Config } from 'primevue';
import ToastService from 'primevue/toastservice';
import { createApp, markRaw } from 'vue';
import type { Router } from 'vue-router';

import App from '@/App.vue';

import i18n from '@/config/i18n';
import router from '@/router';
import { theme } from '@/utils/tailwind';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router;
    }
}

const pinia = createPinia();

const app = createApp(App);

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

const CustomPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: theme('--color-primary-50'),
            100: theme('--color-primary-100'),
            200: theme('--color-primary-200'),
            300: theme('--color-primary-300'),
            400: theme('--color-primary-400'),
            500: theme('--color-primary-500'),
            600: theme('--color-primary-600'),
            700: theme('--color-primary-700'),
            800: theme('--color-primary-800'),
            900: theme('--color-primary-900'),
        },
    },
});

app.use(Config, {
    theme: {
        options: {
            darkModeSelector: false,
        },
        preset: CustomPreset,
    },
});

app.use(ToastService);
app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');
