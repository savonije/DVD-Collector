<script lang="ts" setup>
    import { onClickOutside } from '@vueuse/core';
    import Button from 'primevue/button';
    import {
        computed,
        defineAsyncComponent,
        onBeforeUnmount,
        onMounted,
        reactive,
    } from 'vue';
    import { useI18n } from 'vue-i18n';

    import { useStoreAuth } from '@/stores/storeAuth';

    const AddTitle = defineAsyncComponent(
        () => import('@/components/AddTitle.vue'),
    );
    const DarkModeToggle = defineAsyncComponent(
        () => import('@/components/DarkModeToggle.vue'),
    );

    const storeAuth = useStoreAuth();
    const { t } = useI18n();

    const state = reactive({
        isMenuOpen: false,
        menuRef: null as HTMLElement | null,
    });

    const toggleMenu = () => (state.isMenuOpen = !state.isMenuOpen);

    const closeMenu = () => (state.isMenuOpen = false);

    const isLoggedIn = computed(() => !!storeAuth.user?.id);

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') closeMenu();
    };

    onClickOutside(state.menuRef, closeMenu);

    onMounted(() => {
        window.addEventListener('keydown', handleEscape);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleEscape);
    });
</script>

<template>
    <Button
        :aria-label="t('common.toggleMenu')"
        @click="toggleMenu"
        icon="pi pi-bars"
        class="size-10"
    />

    <Transition name="slide">
        <div
            v-if="state.isMenuOpen"
            ref="menuRef"
            class="fixed inset-y-0 right-0 z-10 flex w-2/3 transform flex-col items-center justify-center gap-6 bg-white p-3 shadow-lg transition-transform sm:w-1/3"
        >
            <div class="relative h-full w-full">
                <Button
                    class="absolute! top-0! right-0!"
                    :aria-label="t('common.closeMenu')"
                    variant="text"
                    label="&times;"
                    @click="state.isMenuOpen = false"
                />

                <ul class="flex flex-col gap-6 pt-8">
                    <li>
                        <AddTitle fluid-button />
                    </li>
                    <li>
                        <Button
                            v-if="isLoggedIn"
                            :aria-label="t('common.logoutUser')"
                            @click="
                                storeAuth.logoutUser();
                                state.isMenuOpen = false;
                            "
                            :label="t('common.logout')"
                            variant="text"
                            fluid
                        />
                    </li>
                    <li>
                        <Button
                            v-if="!isLoggedIn"
                            @click="state.isMenuOpen = false"
                            fluid
                            class="mb-3"
                        >
                            <RouterLink :to="{ name: 'auth' }">
                                {{ t('common.login') }}
                            </RouterLink>
                        </Button>
                    </li>

                    <li @click="closeMenu" class="flex justify-center">
                        <DarkModeToggle />
                    </li>
                </ul>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    /* Slide-in transition */
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease-in-out;
    }

    .slide-enter-from,
    .slide-leave-to {
        transform: translateX(100%);
    }

    .slide-enter-to,
    .slide-leave-from {
        transform: translateX(0);
    }
</style>
