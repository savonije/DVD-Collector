<script setup lang="ts">
    import axios from 'axios';
    import { nextTick, onMounted, ref, type Ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    import DeleteTitle from '@/components/DeleteTitle.vue';
    import isLoading from '@/components/isLoading.vue';
    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import router from '@/router';
    import { useStoreAuth } from '@/stores/storeAuth';
    import { useStoreDVDs } from '@/stores/storeDVDs';
    import type { MovieDetails } from '@/types';

    const { t } = useI18n();

    const route = useRoute();
    const StoreDVD = useStoreDVDs();
    const storeAuth = useStoreAuth();

    const id = route.params.id as string;
    const name = route.params.name as string;

    const queryName = name.split(' ').join('+');

    const movieDetails: Ref<MovieDetails | null> = ref(null);
    const isDataLoading = ref(true);
    const showEdit = ref(false);
    const titleInput = ref(name);
    const inputRef = ref<HTMLInputElement | null>(null);

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
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                isDataLoading.value = false;
            });
    };

    const toggleEdit = async () => {
        if (!storeAuth.user?.id) return;
        showEdit.value = !showEdit.value;

        await nextTick();
        if (showEdit.value && inputRef.value) {
            inputRef.value.focus();
        }
    };

    const submitForm = () => {
        if (name !== titleInput.value) {
            StoreDVD.updateDVD(id, titleInput.value);
            router.push({ path: `/` });
        }

        showEdit.value = false;
    };

    onMounted(() => {
        getInfo();
    });
</script>

<template>
    <DefaultLayout>
        <div class="mx-auto max-w-[800px]">
            <div class="bg-white shadow-sm">
                <div class="bg-teal p-6">
                    <div class="flex justify-end">
                        <h2
                            v-if="!showEdit"
                            class="text-shark mb-0 text-3xl font-bold capitalize"
                            @click="toggleEdit()"
                        >
                            {{ name }}
                        </h2>
                        <form v-else @submit.prevent="submitForm">
                            <input
                                ref="inputRef"
                                v-model="titleInput"
                                class="bg-teal text-shark font-heading p-3 text-right text-3xl font-bold capitalize"
                                type="text"
                            />
                        </form>
                    </div>
                    <div
                        v-if="movieDetails"
                        class="text-shark text-right text-xs"
                    >
                        {{ movieDetails?.Rated }} |
                        {{ movieDetails?.Runtime }} | {{ movieDetails?.Genre }}
                    </div>
                </div>
                <div class="p-6">
                    <div
                        v-if="!isDataLoading && movieDetails"
                        class="flex gap-6"
                    >
                        <div class="w-1/3">
                            <figure
                                v-if="movieDetails.Poster"
                                class="-mt-12 shrink-0 border-2"
                            >
                                <img
                                    :src="movieDetails.Poster"
                                    :alt="name"
                                    width="300"
                                    height="441"
                                />
                            </figure>
                        </div>

                        <div class="w-2/3">
                            <div class="mb-1 text-xs font-bold text-gray-400">
                                {{ movieDetails?.Year }} |
                                {{ movieDetails?.Director }}
                            </div>

                            <div class="text-xs text-gray-400">
                                <span>{{ movieDetails.Awards }}</span>
                            </div>

                            <div class="mt-6">
                                <div
                                    class="font-heading text-xs font-bold uppercase"
                                >
                                    {{ t('titles.summary') }}
                                </div>
                                <div class="text-black-700 text-sm">
                                    {{ movieDetails.Plot }}
                                </div>
                            </div>

                            <div class="text-black-700 mt-3 text-xs italic">
                                {{ movieDetails.Actors }}
                            </div>

                            <div
                                class="mt-6 flex flex-col justify-center gap-3"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="score">
                                        {{ movieDetails.Metascore }}
                                    </div>
                                    <span class="text-black-700 text-xs">
                                        {{ t('titles.metascore') }}
                                    </span>
                                </div>

                                <div class="flex items-center gap-3">
                                    <div class="score">
                                        {{ movieDetails.imdbRating }}
                                    </div>
                                    <span class="text-black-700 text-xs">
                                        {{ t('titles.imdb') }}
                                    </span>
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
                </div>
            </div>
        </div>

        <div class="mx-auto max-w-[800px] py-6">
            <div class="flex justify-between">
                <div>
                    <span
                        class="button button-neutral cursor-pointer"
                        @click="$router.back()"
                    >
                        {{ t('common.backToOverview') }}
                    </span>
                </div>
                <div v-if="storeAuth.user?.id">
                    <DeleteTitle :id="id" :name="name" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<style scoped>
    @reference "@/assets/main.css";

    .score {
        @apply flex h-8 w-8 items-center justify-center bg-gray-800 text-lg font-bold text-white;
    }
</style>
