<script lang="ts" setup>
    import PersonalRating from '@/components/PersonalRating.vue';

    import type { Movie } from '@/types';

    defineProps<{
        item: Movie;
    }>();
</script>

<template>
    <RouterLink
        :to="{ name: 'detail', params: { name: item.name, id: item.id } }"
    >
        <div class="movie-card">
            <div class="relative grow p-4">
                <h3 class="mb-0 font-bold capitalize">{{ item.name }}</h3>

                <div
                    v-if="item.year || item.director"
                    class="mb-3 text-xs text-gray-400"
                >
                    {{ item.year }} | {{ item.director }}
                </div>

                <div
                    class="text-black-600 line-clamp-5 text-sm leading-loose dark:text-gray-200"
                >
                    {{ item.plot }}
                </div>
            </div>

            <div class="movie-poster shrink-0 rounded-r">
                <div v-if="item?.poster" class="h-full">
                    <img :src="item?.poster" />
                </div>
                <div
                    v-else
                    class="flex h-[300px] max-h-full w-[200px] max-w-full items-center justify-center bg-gray-400 text-7xl text-gray-500"
                >
                    ?
                </div>

                <PersonalRating :rating="item.rating" />
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
    @reference "@/styles/main.css";

    .movie-card {
        @apply relative flex flex-row gap-3 rounded-lg bg-white shadow transition-shadow hover:shadow-md dark:bg-gray-950 dark:text-white;

        &:hover img {
            @apply scale-[110%];
        }
    }

    .movie-poster {
        @apply relative overflow-hidden;

        img {
            @apply relative h-full w-[150px] max-w-full transform object-cover transition duration-500 md:h-[300px] md:w-[200px];

            &:after {
                @apply absolute top-0 left-0 z-10 h-full w-full bg-linear-to-r from-white content-[''];
            }
        }

        .rating {
            @apply absolute top-3 right-3;
        }
    }
</style>
