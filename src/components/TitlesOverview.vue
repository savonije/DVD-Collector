<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import FilterTitles from '@/components/FilterTitles.vue';
    import isLoading from '@/components/isLoading.vue';
    import SortOrder from '@/components/SortOrder.vue';
    import TitleCard from '@/components/TitleCard.vue';

    import { useDebounce } from '@/composables/useDebounce';
    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { Movie } from '@/types';

    const { t } = useI18n();

    const items = useStoreDVDs();

    const searchQuery = ref('');
    const sortOrder = ref('asc');

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const filteredDVDs = computed<Movie[]>(() => {
        const filtered = items.DVDs.filter((dvd) =>
            dvd.name
                .toLowerCase()
                .includes(debouncedSearchQuery.value.toLowerCase()),
        );

        filtered.sort((a, b) => {
            if (sortOrder.value === 'asc') {
                return a.name.localeCompare(b.name);
            }

            if (sortOrder.value === 'des') {
                return b.name.localeCompare(a.name);
            }

            if (sortOrder.value === 'ratingDesc') {
                const ratingA = a.rating ?? 0;
                const ratingB = b.rating ?? 0;
                return ratingA - ratingB;
            }

            if (sortOrder.value === 'ratingAsc') {
                const ratingA = a.rating ?? 0;
                const ratingB = b.rating ?? 0;
                return ratingB - ratingA;
            }

            if (sortOrder.value === 'dateAsc') {
                return (
                    new Date(a.dateAdded ?? 0).getTime() -
                    new Date(b.dateAdded ?? 0).getTime()
                );
            }

            if (sortOrder.value === 'dateDesc') {
                return (
                    new Date(b.dateAdded ?? 0).getTime() -
                    new Date(a.dateAdded ?? 0).getTime()
                );
            }

            return 0;
        });

        return filtered;
    });
</script>

<template>
    <template v-if="!items.DVDsLoaded">
        <isLoading />
    </template>
    <template v-else>
        <FilterTitles v-model="searchQuery" />

        <div
            class="mb-12 flex flex-col items-center justify-between sm:flex-row"
        >
            <div
                v-if="searchQuery"
                v-html="
                    t('common.searchResults', {
                        filterLength: filteredDVDs.length,
                        totalLength: items.DVDs.length,
                    })
                "
            ></div>
            <div
                v-else
                v-html="t('common.totalTitles', { count: items.DVDs.length })"
            ></div>

            <div class="mt-6 flex w-full justify-end sm:mt-0">
                <SortOrder v-model="sortOrder" />
            </div>
        </div>

        <div class="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <TitleCard
                v-for="item in filteredDVDs"
                :key="item.id"
                :item="item"
            />
        </div>

        <div v-if="!filteredDVDs.length">
            <h1>
                {{ t('errors.noResults') }}
            </h1>
        </div>
    </template>
</template>
