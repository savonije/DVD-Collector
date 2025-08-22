<script setup lang="ts">
    import { Button } from 'primevue';
    import { defineAsyncComponent } from 'vue';
    import { useI18n } from 'vue-i18n';

    import isLoading from '@/components/isLoading.vue';

    import type { MovieID } from '@/types';

    const ModalDeleteTitle = defineAsyncComponent(
        () => import('@/components/ModalDeleteTitle.vue'),
    );

    const { t } = useI18n();

    defineProps<MovieID>();

    const isModalVisible = defineModel<boolean>();
</script>

<template>
    <Button
        @click="isModalVisible = true"
        severity="danger"
        :label="t('common.delete')"
    />

    <Suspense>
        <template #default>
            <ModalDeleteTitle
                v-if="isModalVisible"
                :id="id"
                v-model="isModalVisible"
                :name="name"
            />
        </template>
        <template #fallback>
            <isLoading />
        </template>
    </Suspense>
</template>
