<script setup lang="ts">
    import { nextTick, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    import DeleteTitle from '@/components/DeleteTitle.vue';
    import TitleDetails from '@/components/TitleDetails.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreAuth } from '@/stores/storeAuth';
    import { useStoreDVDs } from '@/stores/storeDVDs';

    const route = useRoute();
    const StoreDVD = useStoreDVDs();
    const storeAuth = useStoreAuth();

    const { t } = useI18n();

    const id = route.params.id as string;
    const name = route.params.name as string;

    const showEdit = ref(false);
    const titleInput = ref(name);
    const inputRef = ref<HTMLInputElement | null>(null);

    const toggleEdit = async () => {
        if (!storeAuth.user?.id) return;
        showEdit.value = !showEdit.value;
        await nextTick();
        if (showEdit.value && inputRef.value) {
            inputRef.value.focus();
        }
    };

    const submitForm = () => {
        if (name !== titleInput.value) {
            StoreDVD.updateDVD(id, titleInput.value);
        }
        showEdit.value = false;
    };
</script>

<template>
    <DefaultLayout>
        <div class="mx-auto max-w-[800px]">
            <div class="bg-white shadow-sm dark:bg-gray-950">
                <div class="bg-teal p-6">
                    <div class="flex justify-end">
                        <h2
                            v-if="!showEdit"
                            class="text-shark mb-0 text-3xl font-bold capitalize"
                            @click="toggleEdit"
                        >
                            {{ name }}
                        </h2>
                        <form v-else @submit.prevent="submitForm">
                            <input
                                ref="inputRef"
                                v-model="titleInput"
                                class="bg-teal text-shark font-heading p-3 text-right text-3xl font-bold capitalize"
                                type="text"
                            />
                        </form>
                    </div>
                </div>
                <div class="p-6">
                    <TitleDetails :id="id" :name="name" />
                </div>
            </div>
        </div>
        <div class="mx-auto max-w-[800px] py-6">
            <div class="flex justify-between">
                <div>
                    <span
                        class="button button-neutral cursor-pointer"
                        @click="$router.back()"
                    >
                        {{ t('common.backToOverview') }}
                    </span>
                </div>
                <div v-if="storeAuth.user?.id">
                    <DeleteTitle :id="id" :name="name" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
