<script lang="ts" setup>
    import Card from 'primevue/card';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>

<template>
    <Card class="min-w-[300px]">
        <template #content>
            <div class="flex flex-col items-center justify-center">
                <img
                    src="/images/no-result.svg"
                    width="75"
                    height="75"
                    alt="t('titles.noResult')"
                />

                <div class="mt-3 text-lg font-bold">
                    <i class="pi pi-info-circle"></i>
                    {{ t('errors.noResults') }}
                </div>
            </div>
        </template>
    </Card>
</template>
