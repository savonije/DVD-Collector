<script setup lang="ts">
    import axios from 'axios';
    import { nanoid } from 'nanoid';
    import { Button, Dialog, FloatLabel, InputText, Select } from 'primevue';
    import { useToast } from 'primevue/usetoast';
    import { nextTick, onMounted, ref, type Ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { Movie } from '@/types';

    const toast = useToast();

    const { t } = useI18n();
    const storeDVD = useStoreDVDs();

    const movieDetails: Ref<Movie | null> = ref(null);
    const uniqueId = nanoid(14);

    const isModelVisible = defineModel<boolean>();
    const titleInput = ref<HTMLInputElement | null>(null);

    const title = ref('');
    const rating = ref(1);

    const closeModal = () => {
        isModelVisible.value = false;
    };

    const ratingOptions = Array.from({ length: 10 }, (_, i) => ({
        label: String(i + 1),
        value: i + 1,
    }));

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

            toast.add({
                severity: 'success',
                summary: t('common.success'),
                detail: t('common.hasBeenAdded', [title.value]),
                life: 3000,
            });

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
    <Dialog
        v-model:visible="isModelVisible"
        modal
        :header="t('titles.addNewDvd')"
        class="min-w-[30rem]"
    >
        <form @submit.prevent="submitForm">
            <div class="mb-12">
                <FloatLabel variant="in" class="mb-3">
                    <InputText
                        id="name"
                        inputRef="titleInput"
                        v-model="title"
                        fluid
                    />

                    <label class="font-bold" for="name">
                        {{ t('titles.title') }}
                    </label>
                </FloatLabel>

                <FloatLabel variant="in">
                    <Select
                        id="rating"
                        v-model="rating"
                        :options="ratingOptions"
                        optionLabel="label"
                        optionValue="value"
                        :placeholder="t('common.selectRating')"
                        fluid
                    />

                    <label class="font-bold" for="rating">
                        {{ t('titles.rating') }}
                    </label>
                </FloatLabel>
            </div>

            <div class="flex justify-between">
                <Button
                    :label="t('common.cancel')"
                    severity="secondary"
                    @click="closeModal"
                />

                <Button
                    type="submit"
                    :label="t('common.save')"
                    severity="success"
                />
            </div>
        </form>
    </Dialog>
</template>
