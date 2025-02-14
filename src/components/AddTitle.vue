<script setup lang="ts">
    import { ref } from 'vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    import ModalAddTitle from './ModalAddTitle.vue';

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

    <ModalAddTitle v-model="isModalVisible" />
</template>
