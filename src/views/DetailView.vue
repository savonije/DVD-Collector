<script setup lang="ts">
import DeleteTitle from '@/components/DeleteTitle.vue'
import axios from 'axios'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import type { MovieDetails } from '@/types'

const route = useRoute()

const id = route.params.id as string
const name = route.params.name as string

const queryName = name.split(' ').join('+')

const movieDetails: Ref<MovieDetails | null> = ref(null)
const isLoading = ref(true)

const getInfo = () => {
  axios
    .get(`http://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`)
    .then((response) => {
      if (response.data.Error === undefined) {
        movieDetails.value = response.data
      }
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  getInfo()
})
</script>

<template>
  <PageHeader />
  <div class="container">
    <h1 class="capitalize">{{ name }}</h1>
  </div>

  <div class="container">
    <div class="bg-white shadow p-6">
      <div class="flex gap-6" v-if="!isLoading && movieDetails">
        <div>
          <figure class="flex-shrink-0 border-2" v-if="movieDetails.Poster">
            <img :src="movieDetails.Poster" :alt="name" width="300" height="441" />
          </figure>
        </div>

        <div>
          <div class="mb-1">
            <span class="font-bold">Title: </span>
            <span>{{ movieDetails.Title }}</span>
          </div>
          <div class="mb-1">
            <span class="font-bold">Year: </span>
            <span>{{ movieDetails.Year }}</span>
          </div>
          <div class="mb-1">
            <span class="font-bold">Genre: </span>
            <span>{{ movieDetails.Genre }}</span>
          </div>
          <div class="mb-1">
            <span class="font-bold">Awards: </span>
            <span>{{ movieDetails.Awards }}</span>
          </div>
          <div class="mb-1">
            <span class="font-bold">Actors: </span>
            <span>{{ movieDetails.Actors }}</span>
          </div>
          <div class="mb-3">
            <span class="font-bold">Director: </span>
            <span>{{ movieDetails.Director }}</span>
          </div>
          <div class="mb-3">
            <span>{{ movieDetails.Plot }}</span>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="h-8 w-8 bg-gray-800 flex items-center justify-center text-lg font-bold text-white"
            >
              {{ movieDetails.Metascore }}
            </div>
            metascore
          </div>
        </div>
      </div>

      <div v-else>
        <p>No movie information found in database...</p>
      </div>
    </div>
  </div>

  <div class="container py-6">
    <div class="flex justify-between">
      <RouterLink to="/" class="button">Back to overview</RouterLink>
      <DeleteTitle :id="id" :name="name" />
    </div>
  </div>
</template>
