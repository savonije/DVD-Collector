<script lang="ts" setup>
    import axios from 'axios';
    import { onMounted, ref, type Ref } from 'vue';

    import PersonalRating from '@/components/PersonalRating.vue';

    import type { Movie, MovieDetails } from '@/types';

    const props = defineProps<Movie>();

    const queryName = props.name.split(' ').join('+');

    const movieDetails: Ref<MovieDetails | null> = ref(null);

    const plot = ref('');

    const getMovieData = () => {
        axios
            .get(
                `https://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`,
            )
            .then((response) => {
                if (response.data.Error === undefined) {
                    movieDetails.value = response.data;
                }
            })
            .then(() => {
                if (!movieDetails.value?.Plot) {
                    return;
                }

                plot.value = movieDetails.value?.Plot;

                if (plot.value.length > 100) {
                    plot.value = plot.value.substring(0, 100) + '...';
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    onMounted(() => {
        getMovieData();
    });
</script>

<template>
    <RouterLink :to="`/movie/${name}/${id}`">
        <div class="movie-card">
            <div class="relative grow p-4">
                <h3 class="mb-0 font-bold capitalize">{{ props.name }}</h3>

                <div
                    v-if="movieDetails?.Year || movieDetails?.Director"
                    class="mb-3 text-xs text-gray-400"
                >
                    {{ movieDetails?.Year }} | {{ movieDetails?.Director }}
                </div>

                <div
                    class="text-black-600 text-sm leading-loose dark:text-gray-200"
                >
                    {{ plot }}
                </div>
            </div>

            <div class="movie-poster shrink-0 rounded-r">
                <div v-if="movieDetails?.Poster" class="h-full">
                    <img :src="movieDetails?.Poster" />
                </div>
                <div
                    v-else
                    class="flex h-[300px] max-h-full w-[200px] max-w-full items-center justify-center bg-gray-400 text-7xl text-gray-500"
                >
                    ?
                </div>

                <PersonalRating :rating="props.rating" />
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
    @reference "@/assets/main.css";

    .movie-card {
        @apply relative flex flex-row gap-3 rounded-lg bg-white shadow transition-shadow hover:shadow-md dark:bg-gray-950 dark:text-white;

        &:hover img {
            @apply scale-[110%];
        }
    }

    .movie-poster {
        @apply relative overflow-hidden;

        img {
            @apply relative h-full w-[150px] max-w-full transform object-cover transition duration-500 sm:h-[300px] sm:w-[200px];

            &:after {
                @apply absolute top-0 left-0 z-10 h-full w-full bg-linear-to-r from-white content-[''];
            }
        }

        .rating {
            @apply absolute top-3 right-3;
        }
    }
</style>
