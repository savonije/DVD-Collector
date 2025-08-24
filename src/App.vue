<script setup lang="ts">
    import { Toast } from 'primevue';
    import { onMounted } from 'vue';
    import { RouterView } from 'vue-router';

    import { useStoreAuth } from '@/stores/storeAuth';

    const storeAuth = useStoreAuth();

    onMounted(() => {
        storeAuth.init();
    });
</script>

<template>
    <RouterView />

    <Toast />
</template>
