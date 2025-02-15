<script setup lang="ts">
    import { nextTick } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { toast, type ToastOptions } from 'vue3-toastify';

    import ModalLayout from '@/layouts/ModalLayout.vue';

    import router from '@/router';
    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { Movie } from '@/types';

    import 'vue3-toastify/dist/index.css';

    const { t } = useI18n();

    const props = defineProps<
        Movie & {
            modelValue: boolean;
        }
    >();

    const emit = defineEmits(['update:modelValue']);

    const StoreDVD = useStoreDVDs();

    const closeModal = () => {
        emit('update:modelValue', false);
    };

    const deleteTitle = async () => {
        if (!props.id) return;
        StoreDVD.deleteDVD(props.id);

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
    <ModalLayout :showModal="props.modelValue" @close="closeModal">
        <form>
            <div class="mb-6">
                <h2 class="mb-3 text-center">{{ t('common.areYouSure') }}</h2>
                {{ t('titles.deleteWarning', { name: props.name }) }}
            </div>
            <div class="flex justify-between gap-3">
                <button
                    class="button button-neutral"
                    type="button"
                    @click.prevent="closeModal"
                >
                    {{ t('common.cancel') }}
                </button>
                <button
                    class="button button-danger"
                    type="button"
                    @click.prevent="deleteTitle"
                >
                    {{ t('common.delete') }}
                </button>
            </div>
        </form>
    </ModalLayout>
</template>
