<script setup lang="ts">
    import Select from 'primevue/select';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const sortOrder = defineModel<string>();

    const sortOptions = [
        { label: t('sort.asc'), value: 'asc' },
        { label: t('sort.desc'), value: 'desc' },
        { label: t('sort.ratingAsc'), value: 'ratingAsc' },
        { label: t('sort.ratingDesc'), value: 'ratingDesc' },
        { label: t('sort.dateAsc'), value: 'dateAsc' },
        { label: t('sort.dateDesc'), value: 'dateDesc' },
    ];
</script>

<template>
    <Select
        v-model="sortOrder"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select sort order"
        checkmark
    />
</template>
