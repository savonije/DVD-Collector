<script setup lang="ts">
    import { Button, Dialog, useToast } from 'primevue';
    import { nextTick } from 'vue';
    import { useI18n } from 'vue-i18n';

    import router from '@/router';
    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { MovieID } from '@/types';

    const toast = useToast();

    const { t } = useI18n();
    const storeDVD = useStoreDVDs();

    const props = defineProps<MovieID>();

    const isModelVisible = defineModel<boolean>();

    const closeModal = () => {
        isModelVisible.value = false;
    };

    const deleteTitle = async () => {
        if (!props.id) return;

        storeDVD.deleteDVD(props.id);

        await router.push({ path: '/' });
        await nextTick();

        toast.add({
            severity: 'success',
            summary: t('common.deleted'),
            detail: t('common.hasBeenDeleted', [props.name]),
            life: 3000,
        });

        closeModal();
    };
</script>

<template>
    <Dialog
        v-model:visible="isModelVisible"
        :header="t('common.areYouSure')"
        modal
        class="md:w-[25rem]"
    >
        <form>
            <div class="mb-6">
                {{ t('titles.deleteWarning', { name: props.name }) }}
            </div>
            <div class="flex justify-between gap-3">
                <Button
                    :label="t('common.cancel')"
                    @click.prevent="closeModal"
                />
                <Button
                    severity="danger"
                    @click.prevent="deleteTitle"
                    :label="t('common.delete')"
                />
            </div>
        </form>
    </Dialog>
</template>
