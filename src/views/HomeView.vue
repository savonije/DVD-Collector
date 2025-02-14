<script setup lang="ts">
    import { onMounted } from 'vue';

    import ShowTitles from '@/components/ShowTitles.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreDVDs } from '@/stores/storeDVDs';

    const storeDVDs = useStoreDVDs();

    onMounted(() => {
        storeDVDs.getDVDs();
    });
</script>

<template>
    <DefaultLayout>
        <ShowTitles />
    </DefaultLayout>
</template>
