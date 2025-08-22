<script setup lang="ts">
    import { Button, Dialog } from 'primevue';
    import { nextTick } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { toast, type ToastOptions } from 'vue3-toastify';

    import router from '@/router';
    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { MovieID } from '@/types';

    import 'vue3-toastify/dist/index.css';

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

        toast.success(`<strong>${props.name}</strong> has been deleted!`, {
            autoClose: 3000,
            theme: 'dark',
            dangerouslyHTMLString: true,
        } as ToastOptions);

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
