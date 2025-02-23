<script setup lang="ts">
    import axios from 'axios';
    import { nanoid } from 'nanoid';
    import { nextTick, onMounted, ref, type Ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { toast, type ToastOptions } from 'vue3-toastify';

    import ModalLayout from '@/layouts/ModalLayout.vue';

    import { useStoreDVDs } from '@/stores/storeDVDs';

    import 'vue3-toastify/dist/index.css';

    import type { Movie } from '@/types';

    const { t } = useI18n();
    const storeDVD = useStoreDVDs();

    const movieDetails: Ref<Movie | null> = ref(null);
    const uniqueId = nanoid(14);

    const model = defineModel<boolean>();
    const titleInput = ref<HTMLInputElement | null>(null);

    const title = ref('');
    const rating = ref(1);

    const closeModal = () => {
        model.value = false;
    };

    const getMovieData = (title: string, rating: number) => {
        axios
            .get(
                `https://www.omdbapi.com/?t=${title}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`,
            )
            .then(({ data }) => {
                const isValid = !data.Error;

                movieDetails.value = isValid ? data : {};

                const movieData: Movie = {
                    awards: isValid ? data.Awards : '',
                    dateAdded: new Date(),
                    director: isValid ? data.Director : '',
                    genre: isValid ? data.Genre : '',
                    id: uniqueId,
                    imdbID: isValid ? data.imdbID : '',
                    imdbRating: isValid ? data.imdbRating : '',
                    metascore: isValid ? data.Metascore : '',
                    name: title,
                    plot: isValid ? data.Plot : '',
                    poster: isValid ? data.Poster : '',
                    rating,
                    year: isValid ? data.Year : '',
                };

                storeDVD.addDVD(movieData);
            })
            .catch(console.error);
    };

    const submitForm = () => {
        if (title.value !== '') {
            getMovieData(title.value, rating.value);

            toast.success(`<strong>${title.value}</strong> has been added!`, {
                autoClose: 3000,
                theme: 'dark',
                dangerouslyHTMLString: true,
            } as ToastOptions);

            title.value = '';
            rating.value = 1;

            closeModal();
        }
    };

    onMounted(() => {
        nextTick(() => {
            if (titleInput.value) {
                titleInput.value.focus();
            }
        });
    });
</script>

<template>
    <ModalLayout :showModal="model" @close="closeModal">
        <h2>
            {{ t('titles.addNewDvd') }}
        </h2>

        <form @submit.prevent="submitForm">
            <div class="mb-12 flex gap-3">
                <div class="flex-1">
                    <label class="mb-2 block font-bold" for="name">
                        {{ t('titles.title') }}:
                    </label>
                    <input
                        id="name"
                        ref="titleInput"
                        v-model="title"
                        class="h-12 w-full rounded border px-6 py-3"
                        type="text"
                    />
                </div>

                <div>
                    <label class="mb-2 block font-bold" for="rating">
                        {{ t('titles.rating') }}:
                    </label>
                    <select
                        id="rating"
                        v-model="rating"
                        class="h-12 rounded border px-6 py-3"
                    >
                        <option v-for="n in 10" :key="n" :value="n">
                            {{ n }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex justify-between">
                <button
                    class="font-bold underline-offset-2 opacity-50 hover:underline"
                    type="button"
                    @click="closeModal"
                >
                    {{ t('common.cancel') }}
                </button>

                <button class="button" type="submit">
                    {{ t('common.save') }}
                </button>
            </div>
        </form>
    </ModalLayout>
</template>
