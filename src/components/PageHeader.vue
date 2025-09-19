<script setup lang="ts">
    import { useToast } from 'primevue';
    import Button from 'primevue/button';
    import { useI18n } from 'vue-i18n';

    import AddTitle from '@/components/AddTitle.vue';
    import DarkModeToggle from '@/components/DarkModeToggle.vue';
    import MobileMenu from '@/components/MobileMenu.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const storeAuth = useStoreAuth();
    const username = import.meta.env.VITE_USERNAME;
    const { t } = useI18n();
    const toast = useToast();
</script>

<template>
    <header class="bg-shark text-primary mb-6 py-3 sm:p-3 sm:py-6">
        <div class="container flex items-center justify-between gap-6">
            <RouterLink :to="{ name: 'home' }">
                <span class="font-heading text-2xl font-bold">
                    {{ t('common.siteTitle', { name: username }) }}
                </span>
            </RouterLink>

            <div class="flex justify-end gap-3 lg:hidden">
                <MobileMenu />
            </div>

            <div class="hidden items-center justify-end gap-6 lg:flex xl:gap-9">
                <AddTitle />

                <DarkModeToggle />

                <Button
                    v-if="storeAuth.user?.id"
                    :aria-label="t('common.logoutUser')"
                    @click="storeAuth.logoutUser(toast, t)"
                    variant="link"
                >
                    {{ t('common.logout') }}
                </Button>

                <RouterLink v-else :to="{ name: 'auth' }">
                    {{ t('common.login') }}
                </RouterLink>
            </div>
        </div>
    </header>
</template>
