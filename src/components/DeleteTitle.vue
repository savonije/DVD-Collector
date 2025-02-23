<script setup lang="ts">
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
    <button
        class="text-red font-bold underline-offset-2 opacity-50 hover:underline"
        type="button"
        @click="isModalVisible = true"
    >
        {{ t('common.delete') }}
    </button>

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
