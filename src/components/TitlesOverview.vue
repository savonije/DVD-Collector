<script setup lang="ts">
    import { Tag } from 'primevue';
    import { computed, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    import FilterTitles from '@/components/FilterTitles.vue';
    import isLoading from '@/components/isLoading.vue';
    import NoResult from '@/components/NoResult.vue';
    import SortOrder from '@/components/SortOrder.vue';
    import TitleCard from '@/components/TitleCard.vue';

    import { useDebounce } from '@/composables/useDebounce';
    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { Movie } from '@/types';

    const { t } = useI18n();
    const items = useStoreDVDs();

    const searchQuery = ref('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const storedSortOrder = localStorage.getItem('dvdSortOrder') ?? 'asc';
    const sortOrder = ref(storedSortOrder);

    const filteredDVDs = computed<Movie[]>(() => {
        const query = debouncedSearchQuery.value.toLowerCase();

        const sorters: Record<string, (a: Movie, b: Movie) => number> = {
            asc: (a, b) => a.name.localeCompare(b.name),
            des: (a, b) => b.name.localeCompare(a.name),
            ratingAsc: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
            ratingDesc: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
            dateAsc: (a, b) =>
                new Date(a.dateAdded ?? 0).getTime() -
                new Date(b.dateAdded ?? 0).getTime(),
            dateDesc: (a, b) =>
                new Date(b.dateAdded ?? 0).getTime() -
                new Date(a.dateAdded ?? 0).getTime(),
        };

        return items.DVDs.filter((dvd) =>
            dvd.name.toLowerCase().includes(query),
        ).sort(sorters[sortOrder.value] ?? (() => 0));
    });

    watch(sortOrder, (newValue) => {
        localStorage.setItem('dvdSortOrder', newValue);
    });
</script>

<template>
    <template v-if="!items.DVDsLoaded">
        <isLoading />
    </template>
    <template v-else>
        <FilterTitles v-model="searchQuery" />

        <div class="mb-6 flex items-center justify-between gap-3">
            <Tag class="flex-none">
                <template v-if="debouncedSearchQuery">
                    {{ filteredDVDs.length }} / {{ items.DVDs.length }}
                    {{ t('common.DVDs') }}
                </template>
                <template v-else>
                    {{ items.DVDs.length }} {{ t('common.DVDs') }}
                </template>
            </Tag>

            <div class="flex w-full items-center justify-end gap-3">
                <span class="font-bold">{{ t('common.sort') }}:</span>
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

        <div
            v-if="!filteredDVDs.length"
            class="flex items-center justify-center"
        >
            <NoResult />
        </div>
    </template>
</template>
