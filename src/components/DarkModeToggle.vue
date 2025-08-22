<script setup lang="ts">
    import Button from 'primevue/button';
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import DarkModeIcon from '@/images/icons/darkmode.svg';
    import LightModeIcon from '@/images/icons/lightmode.svg';

    const { t } = useI18n();
    const isDarkMode = ref(false);
    const loading = ref(true);

    const applyTheme = () => {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            isDarkMode.value = true;
            document.documentElement.classList.add('dark');
            loading.value = false;
            return;
        }

        if (storedTheme === 'light') {
            isDarkMode.value = false;
            document.documentElement.classList.remove('dark');
            loading.value = false;
            return;
        }

        const prefersDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        isDarkMode.value = prefersDarkScheme;
        document.documentElement.classList.toggle('dark', prefersDarkScheme);

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
    <Button
        class="px-3"
        :aria-label="isDarkMode ? t('common.lightMode') : t('common.darkMode')"
        @click="toggleDarkMode"
        severity="secondary"
    >
        <div v-if="!loading">
            <Transition name="fade" mode="out-in">
                <component
                    :is="isDarkMode ? LightModeIcon : DarkModeIcon"
                    v-if="!loading"
                    :key="isDarkMode ? 'light' : 'dark'"
                    class="size-6"
                    :alt="
                        isDarkMode
                            ? t('common.lightMode')
                            : t('common.darkMode')
                    "
                />
            </Transition>
        </div>
    </Button>
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
