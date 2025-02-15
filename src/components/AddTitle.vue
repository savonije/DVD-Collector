<script setup lang="ts">
    import { defineAsyncComponent, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import isLoading from '@/components/isLoading.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const ModalAddTitle = defineAsyncComponent(
        () => import('@/components/ModalAddTitle.vue'),
    );

    const { t } = useI18n();
    const storeAuth = useStoreAuth();
    const isModalVisible = ref(false);

    const emit = defineEmits(['open-modal']);

    const openModal = () => {
        isModalVisible.value = true;
        emit('open-modal');
    };
</script>

<template>
    <button
        v-if="storeAuth.user?.id"
        class="button"
        type="button"
        @click="openModal"
    >
        {{ t('titles.addMovie') }}
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
