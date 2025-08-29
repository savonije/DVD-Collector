<script lang="ts" setup>
    import Button from 'primevue/button';
    import { useI18n } from 'vue-i18n';

    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    const { t } = useI18n();
</script>

<template>
    <DefaultLayout>
        <div class="flex flex-col items-center justify-center">
            <img src="/images/404.svg" width="500" height="500" alt="" />
            <h1 class="mb-1">{{ t('errors.error') }}</h1>
            <p class="text-xl">{{ t('errors.404') }}</p>

            <Button
                class="mt-6"
                :label="t('errors.goBackHome')"
                @click="$router.push('/')"
            />
        </div>
    </DefaultLayout>
</template>
