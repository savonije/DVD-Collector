/* MovieDetails.vue */
<script setup lang="ts">
    import axios from 'axios';
    import { computed, onMounted, ref, type Ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import isLoading from '@/components/isLoading.vue';

    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { MovieDetails } from '@/types';

    const props = defineProps<{ id: string; name: string }>();
    const { t } = useI18n();
    const StoreDVD = useStoreDVDs();
    const queryName = props.name.split(' ').join('+');

    const movieDetails: Ref<MovieDetails | null> = ref(null);
    const isDataLoading = ref(true);
    const personalRating = computed(
        () => StoreDVD.DVDs.find((dvd) => dvd.id === props.id)?.rating || 'N/A',
    );
    const editableRating = ref(+personalRating.value);
    const isEditingRating = ref(false);

    const getInfo = () => {
        axios
            .get(
                `https://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`,
            )
            .then((response) => {
                if (response.data.Error === undefined) {
                    movieDetails.value = response.data;
                }
            })
            .catch((error) => console.error(error))
            .finally(() => (isDataLoading.value = false));
    };

    const updateRating = () => {
        if (editableRating.value !== personalRating.value) {
            StoreDVD.updateDVD(props.id, props.name, editableRating.value);
        }
        isEditingRating.value = false;
    };

    onMounted(getInfo);
</script>

<template>
    <div v-if="!isDataLoading && movieDetails" class="flex gap-6">
        <div class="w-1/3">
            <figure v-if="movieDetails.Poster" class="-mt-12 shrink-0 border-2">
                <img
                    :src="movieDetails.Poster"
                    :alt="props.name"
                    width="300"
                    height="441"
                />
            </figure>
        </div>
        <div class="w-2/3">
            <div
                class="mb-1 text-xs font-bold text-gray-400 dark:text-gray-200"
            >
                {{ movieDetails?.Year }} | {{ movieDetails?.Director }}
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-200">
                <span>{{ movieDetails.Awards }}</span>
            </div>
            <div class="mt-6">
                <div class="font-heading text-xs font-bold uppercase">
                    {{ t('titles.summary') }}
                </div>
                <div class="text-black-700 text-sm dark:text-gray-200">
                    {{ movieDetails.Plot }}
                </div>
            </div>
            <div class="text-black-700 mt-3 text-xs italic dark:text-gray-200">
                {{ movieDetails.Actors }}
            </div>
            <div class="mt-6 flex flex-col justify-center gap-3">
                <div class="flex items-center gap-3">
                    <div class="score">{{ movieDetails.Metascore }}</div>
                    <span class="text-black-700 text-xs dark:text-gray-200">{{
                        t('titles.metascore')
                    }}</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="score">{{ movieDetails.imdbRating }}</div>
                    <span class="text-black-700 text-xs dark:text-gray-200">{{
                        t('titles.imdb')
                    }}</span>
                </div>
                <div class="flex items-center gap-3">
                    <div
                        v-if="!isEditingRating"
                        class="score"
                        @click="isEditingRating = true"
                    >
                        {{ personalRating }}
                    </div>
                    <input
                        v-else
                        v-model="editableRating"
                        class="w-12 rounded border text-center"
                        type="number"
                        min="0"
                        max="10"
                        @blur="updateRating"
                        @keyup.enter="updateRating"
                    />
                    <span class="text-black-700 text-xs dark:text-gray-200">{{
                        t('titles.personalRating')
                    }}</span>
                </div>
            </div>
            <div v-if="movieDetails.imdbID" class="mt-3">
                <a
                    class="text-xs text-gray-200"
                    :href="`https://www.imdb.com/title/${movieDetails.imdbID}`"
                    target="_blank"
                >
                    {{ t('titles.imdbLink') }}
                </a>
            </div>
        </div>
    </div>
    <div v-else-if="isDataLoading">
        <isLoading />
    </div>
    <div v-else>
        <p>{{ t('titles.noResult') }}...</p>
    </div>
</template>

<style scoped>
    @reference "@/assets/main.css";

    .score {
        @apply flex h-8 w-8 items-center justify-center bg-gray-800 text-lg font-bold text-white dark:bg-gray-100 dark:text-black;
    }
</style>
