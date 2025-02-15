<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const isDarkMode = ref(false);

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
        class="text-white"
        :aria-label="isDarkMode ? t('common.lightMode') : t('common.darkMode')"
        @click="toggleDarkMode"
    >
        {{ isDarkMode ? t('common.light') : t('common.dark') }}
    </button>
</template>
