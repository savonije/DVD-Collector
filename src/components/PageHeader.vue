<script setup lang="ts">
    import { useI18n } from 'vue-i18n';

    import AddTitle from '@/components/AddTitle.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const storeAuth = useStoreAuth();

    const username = import.meta.env.VITE_USERNAME;

    const { t } = useI18n();
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
