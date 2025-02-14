<script setup lang="ts">
    import { defineAsyncComponent, ref } from 'vue';

    import isLoading from '@/components/isLoading.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const ModalAddTitle = defineAsyncComponent(
        () => import('./ModalAddTitle.vue'),
    );

    const storeAuth = useStoreAuth();
    const isModalVisible = ref(false);
</script>

<template>
    <button
        v-if="storeAuth.user?.id"
        class="button"
        type="button"
        @click="isModalVisible = true"
    >
        Add movie
    </button>

    <Suspense>
        <template #default>
            <ModalAddTitle v-if="isModalVisible" v-model="isModalVisible" />
        </template>
        <template #fallback>
            <isLoading />
        </template>
    </Suspense>
</template>
