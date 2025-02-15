<script setup lang="ts">
    import { onMounted } from 'vue';

    import TitlesOverview from '@/components/TitlesOverview.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreDVDs } from '@/stores/storeDVDs';

    const storeDVDs = useStoreDVDs();

    onMounted(() => {
        storeDVDs.getDVDs();
    });
</script>

<template>
    <DefaultLayout>
        <TitlesOverview />
    </DefaultLayout>
</template>
