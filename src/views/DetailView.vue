<script setup lang="ts">
import DeleteTitle from '@/components/DeleteTitle.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id
const name = route.params.name

const queryName = name.split(' ').join('+')

const movieDetails = ref(null)

const getInfo = () => {
  axios
    .get(`http://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`)
    .then(function (response) {
      if (response.data.Error === undefined) {
        movieDetails.value = response.data
      }
    })
    .catch(function (error) {
      console.error(error)
    })
}

onMounted(() => {
  getInfo()
})
</script>

<template>
  <div class="container !px-0">
    <h1>{{ $route.params.name }}</h1>
  </div>
  <div class="container bg-white shadow p-6">
    <div class="flex gap-6" v-if="movieDetails">
      <div>
        <figure class="flex-shrink-0 border-2" v-if="movieDetails.Poster">
          <img :src="movieDetails.Poster" :alt="$route.params.name" width="300" height="441" />
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
  <div class="container !px-0 py-6">
    <div class="flex justify-between">
      <RouterLink to="/" class="button">Back to overview</RouterLink>
      <DeleteTitle :id="id" :name="name" />
    </div>
  </div>
</template>
