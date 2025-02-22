<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    import DeleteTitle from '@/components/DeleteTitle.vue';
    import TitleDetails from '@/components/TitleDetails.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const route = useRoute();
    const storeAuth = useStoreAuth();

    const { t } = useI18n();

    const id = route.params.id as string;
    const name = route.params.name as string;
</script>

<template>
    <DefaultLayout>
        <div class="mx-auto max-w-[800px]">
            <div class="bg-white shadow-sm dark:bg-gray-950">
                <div class="bg-teal p-6">
                    <div class="flex justify-end">
                        <h2
                            class="text-shark mb-0 text-3xl font-bold capitalize"
                        >
                            {{ name }}
                        </h2>
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
                    <button
                        class="button button-neutral cursor-pointer"
                        type="button"
                        @click="$router.back()"
                    >
                        {{ t('common.backToOverview') }}
                    </button>
                </div>

                <div v-if="storeAuth.user?.id">
                    <DeleteTitle :id="id" :name="name" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
