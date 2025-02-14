<script setup lang="ts">
    import AddTitle from '@/components/AddTitle.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const storeAuth = useStoreAuth();

    const username = import.meta.env.VITE_USERNAME;
</script>

<template>
    <header class="bg-shark text-teal mb-6 p-3">
        <div
            class="container flex flex-col justify-center gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
            <RouterLink to="/">
                <span class="font-heading text-2xl font-bold">
                    {{ username }}'s DVD collection
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
                    Logout
                </button>
                <RouterLink v-else class="button text-white" to="/login">
                    Login
                </RouterLink>
            </div>
        </div>
    </header>
</template>
