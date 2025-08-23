import { fileURLToPath, URL } from 'node:url';
import pkg from './package.json';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    base: '/',
    plugins: [vue(), vueJsx(), svgLoader(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendors': ['vue', 'vue-router'],
                    firebase: [
                        'firebase/app',
                        'firebase/auth',
                        'firebase/firestore',
                    ],
                    vendor: ['axios'],
                },
            },
        },
        minify: 'esbuild',
    },
});
