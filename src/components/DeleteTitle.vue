<script setup lang="ts">
    import { defineAsyncComponent, ref } from 'vue';

    import isLoading from '@/components/isLoading.vue';

    import type { Movie } from '@/types';

    const ModalDeleteTitle = defineAsyncComponent(
        () => import('./ModalDeleteTitle.vue'),
    );

    const isModalVisible = ref(false);

    const props = defineProps<Movie>();
</script>

<template>
    <button
        class="text-red font-bold underline-offset-2 opacity-50 hover:underline"
        type="button"
        @click="isModalVisible = true"
    >
        Delete
    </button>

    <Suspense>
        <template #default>
            <ModalDeleteTitle
                v-if="isModalVisible"
                :id="props.id"
                v-model="isModalVisible"
                :name="props.name"
                :rating="props.rating"
            />
        </template>
        <template #fallback>
            <isLoading />
        </template>
    </Suspense>
</template>
