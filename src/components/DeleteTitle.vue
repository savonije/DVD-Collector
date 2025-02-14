<script setup lang="ts">
    import { ref } from 'vue';

    import type { Movie } from '@/types';

    import ModalDeleteTitle from './ModalDeleteTitle.vue';

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

    <ModalDeleteTitle
        :id="props.id"
        v-model="isModalVisible"
        :name="props.name"
        :rating="props.rating"
    />
</template>
