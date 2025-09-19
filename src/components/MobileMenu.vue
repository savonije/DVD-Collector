<script lang="ts" setup>
    import { Drawer, useToast } from 'primevue';
    import Button from 'primevue/button';
    import { computed, defineAsyncComponent, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import { useStoreAuth } from '@/stores/storeAuth';

    const isMenuVisible = ref(false);

    const AddTitle = defineAsyncComponent(
        () => import('@/components/AddTitle.vue'),
    );
    const DarkModeToggle = defineAsyncComponent(
        () => import('@/components/DarkModeToggle.vue'),
    );

    const isLoggedIn = computed(() => !!storeAuth.user?.id);

    const storeAuth = useStoreAuth();
    const { t } = useI18n();
    const toast = useToast();
</script>

<template>
    <Button
        :aria-label="t('common.toggleMenu')"
        @click="isMenuVisible = true"
        icon="pi pi-bars"
        class="size-10"
    />

    <Drawer v-model:visible="isMenuVisible" position="right" header="Menu">
        <ul class="grid gap-2">
            <li v-if="isLoggedIn">
                <AddTitle fluid-button @clicked="isMenuVisible = false" />
            </li>
            <li v-if="isLoggedIn">
                <Button
                    :aria-label="t('common.logoutUser')"
                    @click="storeAuth.logoutUser(toast, t)"
                    :label="t('common.logout')"
                    variant="text"
                    fluid
                />
            </li>
            <li v-if="!isLoggedIn">
                <Button fluid class="mb-3">
                    <RouterLink :to="{ name: 'auth' }">
                        {{ t('common.login') }}
                    </RouterLink>
                </Button>
            </li>

            <li class="flex justify-center">
                <DarkModeToggle />
            </li>
        </ul>
    </Drawer>
</template>
