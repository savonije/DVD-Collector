<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { toast, type ToastOptions } from 'vue3-toastify';

    import ModalLayout from '@/layouts/ModalLayout.vue';

    import { useStoreDVDs } from '@/stores/storeDVDs';

    import 'vue3-toastify/dist/index.css';

    const props = defineProps({
        modelValue: Boolean,
    });
    const emit = defineEmits(['update:modelValue']);

    const StoreDVD = useStoreDVDs();

    const model = ref(props.modelValue);

    watch(
        () => props.modelValue,
        (newValue) => {
            model.value = newValue;
        },
    );

    const title = ref('');
    const rating = ref('1');

    const closeModal = () => {
        model.value = false;
        emit('update:modelValue', false);
    };

    const submitForm = () => {
        if (title.value !== '') {
            StoreDVD.addDVD(title.value, +rating.value);

            toast.success(`<strong>${title.value}</strong> has been added!`, {
                autoClose: 3000,
                theme: 'dark',
                dangerouslyHTMLString: true,
            } as ToastOptions);

            title.value = '';
            rating.value = '1';

            closeModal();
        }
    };
</script>

<template>
    <ModalLayout :showModal="model" @close="closeModal">
        <h2 class="mb-0">Add a new DVD</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label class="block font-bold" for="name">Name:</label>
                <input
                    id="name"
                    v-model="title"
                    class="w-full border px-6 py-3 sm:min-w-[400px]"
                    type="text"
                />
            </div>

            <div class="mb-3">
                <label class="block font-bold" for="rating">Rating:</label>
                <select id="rating" v-model="rating" class="border px-6 py-3">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="flex justify-between">
                <button
                    class="button button-neutral"
                    type="button"
                    @click="closeModal"
                >
                    Cancel
                </button>
                <button class="button" type="submit">Submit</button>
            </div>
        </form>
    </ModalLayout>
</template>
