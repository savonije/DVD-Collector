<script setup lang="ts">
    import Button from 'primevue/button';
    import { defineAsyncComponent } from 'vue';
    import { useI18n } from 'vue-i18n';

    import isLoading from '@/components/isLoading.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const ModalAddTitle = defineAsyncComponent(
        () => import('@/components/ModalAddTitle.vue'),
    );

    const props = defineProps<{
        fluidButton?: boolean;
    }>();

    const { t } = useI18n();
    const storeAuth = useStoreAuth();

    const isModalVisible = defineModel<boolean>();

    const openModal = () => {
        isModalVisible.value = true;
    };

    console.log(props.fluidButton);
</script>

<template>
    <Button
        v-if="storeAuth.user?.id"
        @click="openModal"
        :label="t('titles.addMovie')"
        :fluid="props.fluidButton"
    />

    <Suspense>
        <template #default>
            <ModalAddTitle v-if="isModalVisible" v-model="isModalVisible" />
        </template>
        <template #fallback>
            <isLoading />
        </template>
    </Suspense>
</template>
