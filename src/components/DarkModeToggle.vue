<script setup lang="ts">
    import Button from 'primevue/button';
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
        class="flex items-center justify-center px-3"
        :aria-label="isDarkMode ? t('common.lightMode') : t('common.darkMode')"
        @click="toggleDarkMode"
        severity="secondary"
    >
        <Transition name="fade" mode="out-in">
            <i
                v-if="!loading"
                :key="isDarkMode ? 'light' : 'dark'"
                :class="['pi', isDarkMode ? 'pi-sun' : 'pi-moon', 'text-xl']"
                :aria-label="
                    isDarkMode ? t('common.lightMode') : t('common.darkMode')
                "
            ></i>
        </Transition>
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
