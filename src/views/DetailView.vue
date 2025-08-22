<script setup lang="ts">
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    import DeleteTitle from '@/components/DeleteTitle.vue';
    import TitleDetails from '@/components/TitleDetails.vue';
    import UpdateTitle from '@/components/UpdateTitle.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const route = useRoute();
    const storeAuth = useStoreAuth();
    const { t } = useI18n();

    const id = computed(() => route.params.id as string);
    const name = computed(() => route.params.name as string);
</script>

<template>
    <DefaultLayout>
        <div class="mx-auto w-full md:w-[800px]">
            <div class="bg-white shadow-sm dark:bg-gray-950">
                <div class="bg-primary flex justify-between p-6">
                    <h2 class="text-shark text-3xl font-bold capitalize">
                        {{ name }}
                    </h2>
                </div>
                <div class="p-6">
                    <TitleDetails :id="id" :name="name" />
                </div>
            </div>

            <div class="mt-6 flex justify-between">
                <button
                    class="button button-neutral cursor-pointer"
                    type="button"
                    @click="$router.back()"
                >
                    {{ t('common.backToOverview') }}
                </button>

                <div v-if="storeAuth.user?.id" class="flex gap-9">
                    <UpdateTitle :id="id" :name="name" />
                    <DeleteTitle :id="id" :name="name" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
