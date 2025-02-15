<script lang="ts" setup>
    import { onClickOutside } from '@vueuse/core';
    import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import { useStoreAuth } from '@/stores/storeAuth';

    const AddTitle = defineAsyncComponent(
        () => import('@/components/AddTitle.vue'),
    );
    const DarkModeToggle = defineAsyncComponent(
        () => import('@/components/DarkModeToggle.vue'),
    );
    const MenuIcon = defineAsyncComponent(
        () => import('@/images/icons/menu.svg'),
    );

    const storeAuth = useStoreAuth();
    const { t } = useI18n();

    const isMenuOpen = ref(false);
    const menuRef = ref(null);

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    onClickOutside(menuRef, () => {
        isMenuOpen.value = false;
    });

    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            isMenuOpen.value = false;
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleEscape);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleEscape);
    });
</script>

<template>
    <button type="button" aria-label="Toggle Menu" @click="toggleMenu">
        <MenuIcon />
    </button>

    <transition name="slide">
        <div
            v-if="isMenuOpen"
            ref="menuRef"
            class="bg-teal fixed inset-y-0 right-0 z-10 flex w-[90%] transform flex-col items-center justify-center gap-6 p-3 shadow-lg transition-transform"
        >
            <button
                class="absolute top-3 right-6 text-3xl text-white"
                type="button"
                aria-label="Close menu"
                @click="isMenuOpen = false"
            >
                &times;
            </button>

            <ul>
                <li>
                    <AddTitle @open-modal="isMenuOpen = false" />
                </li>
                <li>
                    <button
                        v-if="storeAuth.user?.id"
                        class="button button-transparent hover:text-shark text-lg text-white"
                        type="button"
                        :aria-label="t('common.logoutUser')"
                        @click="
                            storeAuth.logoutUser();
                            isMenuOpen = false;
                        "
                    >
                        {{ t('common.logout') }}
                    </button>
                </li>
                <li>
                    <RouterLink
                        v-if="!storeAuth.user?.id"
                        class="button hover:text-shark text-lg text-white"
                        to="/login"
                        @click="isMenuOpen = false"
                    >
                        {{ t('common.login') }}
                    </RouterLink>
                </li>
            </ul>

            <ul>
                <li @click="isMenuOpen = false">
                    <DarkModeToggle />
                </li>
            </ul>
        </div>
    </transition>
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
