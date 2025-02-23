<script setup lang="ts">
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const sortOrder = defineModel<string>();
</script>

<template>
    <select
        v-model="sortOrder"
        class="w-full rounded-sm bg-white p-3 font-bold text-black sm:w-auto dark:bg-gray-950 dark:text-white"
    >
        <option value="asc">{{ t('sort.asc') }}</option>
        <option value="des">{{ t('sort.desc') }}</option>
        <option value="ratingAsc">{{ t('sort.ratingAsc') }}</option>
        <option value="ratingDesc">{{ t('sort.ratingDesc') }}</option>
        <option value="dateAsc">{{ t('sort.dateAsc') }}</option>
        <option value="dateDesc">{{ t('sort.dateDesc') }}</option>
    </select>
</template>
