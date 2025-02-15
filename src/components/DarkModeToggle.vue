<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const isDarkMode = ref(false);
    const loading = ref(true);

    const applyTheme = () => {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            isDarkMode.value = true;
            document.documentElement.classList.add('dark');
        } else if (storedTheme === 'light') {
            isDarkMode.value = false;
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDarkScheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            isDarkMode.value = prefersDarkScheme;
            document.documentElement.classList.toggle(
                'dark',
                prefersDarkScheme,
            );
        }

        loading.value = false;
    };

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    };

    onMounted(() => {
        applyTheme();
    });
</script>

<template>
    <button
        class="px-3"
        type="button"
        :aria-label="isDarkMode ? t('common.lightMode') : t('common.darkMode')"
        @click="toggleDarkMode"
    >
        <transition name="fade" mode="out-in">
            <div v-if="!loading">
                <img
                    v-if="!isDarkMode"
                    key="dark"
                    src="/images/icons/darkmode.svg"
                    :alt="t('common.darkMode')"
                />
                <img
                    v-if="isDarkMode"
                    key="light"
                    src="/images/icons/lightmode.svg"
                    :alt="t('common.lightMode')"
                />
            </div>
        </transition>
    </button>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease-in-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
