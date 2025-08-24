<script lang="ts" setup>
    import axios from 'axios';
    import { useToast } from 'primevue';
    import Button from 'primevue/button';
    import { computed, ref, type Ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { Movie, MovieID } from '@/types';

    const { t } = useI18n();
    const toast = useToast();
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

                toast.add({
                    severity: 'danger',
                    summary: t('common.error'),
                    detail: t('common.somethingWentWrong'),
                    life: 3000,
                });
            });

        toast.add({
            severity: 'success',
            summary: t('common.updated'),
            detail: t('common.hasBeenUpdated', [props.name]),
            life: 3000,
        });
    };
</script>

<template>
    <Button
        :label="t('common.fetchImdbData')"
        @click="getMovieData(name)"
        variant="link"
        size="small"
    />
</template>
