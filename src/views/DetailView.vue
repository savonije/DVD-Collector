<script setup lang="ts">
import DeleteTitle from '@/components/DeleteTitle.vue'
import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { MovieDetails } from '@/types'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import isLoading from '@/components/isLoading.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import router from '@/router'
import { useStoreAuth } from '@/stores/storeAuth'

const route = useRoute()
const StoreDVD = useStoreDVDs()
const storeAuth = useStoreAuth()

const id = route.params.id as string
const name = route.params.name as string

const queryName = name.split(' ').join('+')

const movieDetails: Ref<MovieDetails | null> = ref(null)
const isDataLoading = ref(true)
const showEdit = ref(false)
const titleInput = ref(name)

const getInfo = () => {
  axios
    .get(`https://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`)
    .then((response) => {
      if (response.data.Error === undefined) {
        movieDetails.value = response.data
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      isDataLoading.value = false
    })
}

const toggleEdit = () => {
  if (!storeAuth.user?.id) return
  showEdit.value = !showEdit.value
}

const submitForm = () => {
  if (name !== titleInput.value) {
    StoreDVD.updateDVD(id, titleInput.value)
    router.push({ path: `/` })
  }

  showEdit.value = false
}

onMounted(() => {
  getInfo()
})
</script>

<template>
  <DefaultLayout>
    <div class="max-w-[800px] mx-auto">
      <div class="bg-white shadow">
        <div class="bg-teal p-6">
          <div class="flex justify-end">
            <h2 class="text-3xl text-shark mb-0 capitalize" v-if="!showEdit" @click="toggleEdit()">
              {{ name }}
            </h2>
            <form v-else @submit.prevent="submitForm">
              <input
                type="text"
                class="p-3 bg-teal text-right text-3xl text-shark capitalize font-heading font-bold"
                v-model="titleInput"
              />
              <button type="submit" class="button button-neutral">Save</button>
            </form>
          </div>
          <div class="text-xs text-right text-shark" v-if="movieDetails">
            {{ movieDetails?.Rated }} | {{ movieDetails?.Runtime }} | {{ movieDetails?.Genre }}
          </div>
        </div>
        <div class="p-6">
          <div class="flex gap-6" v-if="!isDataLoading && movieDetails">
            <div>
              <figure class="flex-shrink-0 border-2 -mt-12" v-if="movieDetails.Poster">
                <img :src="movieDetails.Poster" :alt="name" width="300" height="441" />
              </figure>
            </div>

            <div>
              <div class="text-gray-400 text-xs font-bold mb-1">
                {{ movieDetails?.Year }} | {{ movieDetails?.Director }}
              </div>

              <div class="text-xs text-gray-400">
                <span>{{ movieDetails.Awards }}</span>
              </div>

              <div class="mt-6">
                <div class="font-heading font-bold text-xs uppercase">Summary</div>
                <div class="text-sm text-black-700">{{ movieDetails.Plot }}</div>
              </div>

              <div class="italic text-xs text-black-700 mt-3">
                {{ movieDetails.Actors }}
              </div>

              <div class="flex justify-center gap-3 flex-col mt-6">
                <div class="flex items-center gap-3">
                  <div class="score">
                    {{ movieDetails.Metascore }}
                  </div>
                  <span class="text-xs text-black-700">Metascore</span>
                </div>

                <div class="flex items-center gap-3">
                  <div class="score">
                    {{ movieDetails.imdbRating }}
                  </div>
                  <span class="text-xs text-black-700">IMDB</span>
                </div>
              </div>

              <div v-if="movieDetails.imdbID" class="mt-3">
                <a
                  :href="`https://www.imdb.com/title/${movieDetails.imdbID}`"
                  target="_blank"
                  class="text-gray-200 text-xs"
                >
                  See IMDB page
                </a>
              </div>
            </div>
          </div>

          <div v-else-if="isDataLoading">
            <isLoading />
          </div>

          <div v-else>
            <p>No movie information found in database...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[800px] mx-auto py-6">
      <div class="flex justify-between">
        <div>
          <span @click="$router.back()" class="button button-neutral cursor-pointer">
            Back to overview
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
.score {
  @apply h-8 w-8 bg-gray-800 flex items-center justify-center text-lg font-bold text-white;
}
</style>
