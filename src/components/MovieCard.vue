<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import type { Movie, MovieDetails } from '@/types'
import axios from 'axios'

const props = defineProps<Movie>()

const ratingColor = ref('')

const getRatingBgColor = (rating: number) => {
  if (rating < 5) {
    ratingColor.value = 'bg-red'
  } else if (rating < 7) {
    ratingColor.value = 'bg-orange-600'
  } else if (rating < 8) {
    ratingColor.value = 'bg-green-500'
  } else {
    ratingColor.value = 'bg-green-600'
  }
}

const queryName = props.name.split(' ').join('+')

const movieDetails: Ref<MovieDetails | null> = ref(null)

const plot = ref('')

const getMovies = () => {
  axios
    .get(`http://www.omdbapi.com/?t=${queryName}&apikey=${import.meta.env.VITE_OMDB_APIKEY}`)
    .then((response) => {
      console.log(response)
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
        plot.value = plot.value.substring(0, 100) + '...'
      } else {
        plot.value
      }

      console.log(plot)
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  if (props.rating) {
    getRatingBgColor(props.rating)
  }

  getMovies()
})
</script>

<template>
  <RouterLink :to="`/movie/${name}/${id}`">
    <div class="movie-card">
      <div class="flex-grow p-3">
        <h4 class="mb-0">{{ movieDetails?.Title }}</h4>
        <span class="text-gray-400 text-xs">
          {{ movieDetails?.Year }}, {{ movieDetails?.Director }}
        </span>
        <span :class="`rating ${ratingColor}`">
          {{ props.rating }}
        </span>

        <div>
          <!-- {{ truncate(movieDetails?.Plot, 150) }} -->
          {{ plot }}
        </div>
      </div>
      <div class="shrink-0">
        <img :src="movieDetails?.Poster" />
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}
.movie-card {
  @apply flex bg-white shadow hover:shadow-md transition-shadow gap-3 rounded-lg flex-row;

  .rating {
    @apply absolute right-3 top-3 w-9 h-9 text-white font-bold flex items-center justify-center;
  }
}
</style>
