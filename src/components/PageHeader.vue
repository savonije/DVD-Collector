<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import AddTitle from '@/components/AddTitle.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const storeAuth = useStoreAuth();
    const username = import.meta.env.VITE_USERNAME;
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
    <header class="bg-shark text-teal mb-6 p-3">
        <div
            class="container flex flex-col justify-center gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
            <RouterLink to="/">
                <span class="font-heading text-2xl font-bold">
                    {{ t('common.siteTitle', { name: username }) }}
                </span>
            </RouterLink>

            <div class="flex justify-end gap-3">
                <AddTitle />

                <button
                    class="text-white"
                    aria-label="Toggle dark mode"
                    @click="toggleDarkMode"
                >
                    {{
                        isDarkMode
                            ? t('common.lightMode')
                            : t('common.darkMode')
                    }}
                </button>

                <button
                    v-if="storeAuth.user?.id"
                    class="button button-transparent text-white"
                    type="button"
                    aria-label="Logout user"
                    @click="storeAuth.logoutUser"
                >
                    {{ t('common.logout') }}
                </button>
                <RouterLink v-else class="button text-white" to="/login">
                    {{ t('common.login') }}
                </RouterLink>
            </div>
        </div>
    </header>
</template>
