<script setup lang="ts">
    import { computed, ref } from 'vue';

    import isLoading from '@/components/isLoading.vue';
    import MovieCard from '@/components/MovieCard.vue';

    import { useDebounce } from '@/composables/useDebounce';
    import { useStoreDVDs } from '@/stores/storeDVDs';

    const items = useStoreDVDs();

    const searchQuery = ref('');
    const sortOrder = ref('asc');

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const filteredDVDs = computed(() => {
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

            if (sortOrder.value === 'rating') {
                const ratingA = a.rating ?? 0;
                const ratingB = b.rating ?? 0;

                return ratingB - ratingA;
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
        <div class="mb-3 flex justify-center">
            <div class="relative w-full max-w-[450px]">
                <input
                    v-model="searchQuery"
                    class="mb-3 w-full rounded-sm bg-white p-6"
                    type="text"
                    placeholder="Search for a DVD..."
                />
                <button
                    v-if="searchQuery"
                    class="absolute top-0 right-0 p-6 text-xl leading-none"
                    @click="searchQuery = ''"
                >
                    &times;
                </button>
            </div>
        </div>

        <div
            class="mb-9 flex flex-col items-center justify-between sm:flex-row"
        >
            <div v-if="searchQuery">
                Filtered
                <span class="font-bold">{{ filteredDVDs.length }}</span> out of
                <span class="font-bold">{{ items.DVDs.length }}</span> results
            </div>
            <div v-else>
                Currently there are a total of
                <span class="font-bold">{{ items.DVDs.length }}</span> titles in
                the database.
            </div>

            <div class="mt-6 flex w-full justify-end sm:mt-0">
                <select
                    v-model="sortOrder"
                    class="w-full rounded-sm bg-white p-3 font-bold text-black sm:w-auto"
                >
                    <option value="asc" selected>A-Z</option>
                    <option value="des">Z-A</option>
                    <option value="rating">Rating High - Low</option>
                </select>
            </div>
        </div>

        <div class="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <MovieCard
                v-for="item in filteredDVDs"
                :id="item.id"
                :key="item.id"
                :name="item.name"
                :rating="item.rating"
            />
        </div>

        <div v-if="!filteredDVDs.length">
            <h1>No DVDs found...</h1>
        </div>
    </template>
</template>
