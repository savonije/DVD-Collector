<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import type { Movie, MovieDetails } from '@/types'
import PersonalRating from '@/components/PersonalRating.vue'
import axios from 'axios'

const props = defineProps<Movie>()

const queryName = props.name.split(' ').join('+')

const movieDetails: Ref<MovieDetails | null> = ref(null)

const plot = ref('')

const getMovieData = () => {
  axios
    .get(`https://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`)
    .then((response) => {
      if (response.data.Error === undefined) {
        movieDetails.value = response.data
      }
    })
    .then(() => {
      if (!movieDetails.value?.Plot) {
        return
      }

      plot.value = movieDetails.value?.Plot

      if (plot.value.length > 100) {
        plot.value = plot.value.substring(0, 150) + '...'
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  getMovieData()
})
</script>

<template>
  <RouterLink :to="`/movie/${name}/${id}`">
    <div class="movie-card">
      <div class="relative flex-grow p-4">
        <h3 class="mb-0 capitalize">{{ props.name }}</h3>

        <div class="text-gray-400 text-xs mb-3" v-if="movieDetails?.Year || movieDetails?.Director">
          {{ movieDetails?.Year }} | {{ movieDetails?.Director }}
        </div>

        <div class="text-black-600 text-sm leading-loose">
          {{ plot }}
        </div>
      </div>

      <div class="shrink-0 movie-poster rounded-r">
        <div v-if="movieDetails?.Poster">
          <img :src="movieDetails?.Poster" />
        </div>
        <div
          v-else
          class="bg-gray-400 w-[200px] h-[300px] max-h-full max-w-full flex items-center justify-center text-7xl text-gray-500"
        >
          ?
        </div>

        <PersonalRating :rating="props.rating" />
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.movie-card {
  @apply relative flex bg-white shadow hover:shadow-md transition-shadow gap-3 rounded-lg flex-row;

  &:hover img {
    @apply scale-[110%];
  }
}

.movie-poster {
  @apply relative overflow-hidden;

  img {
    @apply relative max-w-full transform transition duration-500 w-[200px] h-[300px] object-cover;

    &:after {
      @apply absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white content-[''] z-10;
    }
  }

  .rating {
    @apply absolute top-3 right-3;
  }
}
</style>
