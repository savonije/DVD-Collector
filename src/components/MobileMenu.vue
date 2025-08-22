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
    />

    <Transition name="slide">
        <div
            v-if="state.isMenuOpen"
            ref="menuRef"
            class="bg-shark-800 fixed inset-y-0 right-0 z-10 flex w-2/3 transform flex-col items-center justify-center gap-6 p-3 shadow-lg transition-transform sm:w-1/3"
        >
            <div class="relative h-full w-full">
                <Button
                    class="absolute! top-0! right-0!"
                    :aria-label="t('common.closeMenu')"
                    variant="text"
                    label="&times;"
                    @click="state.isMenuOpen = false"
                />

                <ul class="flex flex-col gap-3 pt-24">
                    <li>
                        <AddTitle
                            @open-modal="state.isMenuOpen = false"
                            fluid-button
                        />
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
                        <RouterLink
                            v-if="!isLoggedIn"
                            to="/login"
                            @click="state.isMenuOpen = false"
                            fluid
                        >
                            {{ t('common.login') }}
                        </RouterLink>
                    </li>
                </ul>

                <ul class="flex justify-center">
                    <li @click="closeMenu">
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
