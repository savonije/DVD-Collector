<script lang="ts" setup>
    import axios from 'axios';
    import { computed, ref, type Ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { toast, type ToastOptions } from 'vue3-toastify';

    import 'vue3-toastify/dist/index.css';

    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { Movie, MovieID } from '@/types';

    const { t } = useI18n();
    const storeDVD = useStoreDVDs();

    const movieDetails: Ref<Movie | null> = ref(null);

    const props = defineProps<MovieID>();

    const personalRating = computed(
        () => storeDVD.DVDs.find((dvd) => dvd.id === props.id)?.rating || 0,
    );

    const getMovieData = (title: string) => {
        axios
            .get(
                `https://www.omdbapi.com/?t=${title}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`,
            )
            .then((response) => {
                if (response.data.Error === undefined) {
                    movieDetails.value = response.data;

                    const movieData: Movie = {
                        awards: response.data.Awards,
                        dateAdded: new Date(),
                        director: response.data.Director,
                        genre: response.data.Genre,
                        id: props.id,
                        imdbID: response.data.imdbID,
                        imdbRating: response.data.imdbRating,
                        metascore: response.data.Metascore,
                        name: props.name,
                        plot: response.data.Plot,
                        poster: response.data.Poster,
                        rating: personalRating.value,
                        runtime: response.data.Runtime,
                        year: response.data.Year,
                    };

                    storeDVD.addDVD(movieData);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        toast.success(`<strong>${props.name}</strong> updated successfully!`, {
            autoClose: 3000,
            theme: 'dark',
            dangerouslyHTMLString: true,
        } as ToastOptions);
    };
</script>

<template>
    <button
        class="font-bold underline-offset-2 opacity-50 hover:underline"
        type="button"
        @click="getMovieData(name)"
    >
        {{ t('common.fetchImdbData') }}
    </button>
</template>
