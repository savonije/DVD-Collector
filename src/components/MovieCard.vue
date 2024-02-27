<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Movie } from '@/types'

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

onMounted(() => {
  if (props.rating) {
    getRatingBgColor(props.rating)
  }
})
</script>

<template>
  <RouterLink :to="`/movie/${name}/${id}`" class="movie-card">
    <h4>{{ props.name }}</h4>
    <span :class="`rating ${ratingColor}`">
      {{ props.rating }}
    </span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.movie-card {
  @apply relative bg-white shadow hover:shadow-md transition-shadow mb-3 p-3 flex gap-3 justify-end md:h-[250px] lg:h-[350px] rounded-lg flex-col aspect-3/4 flex-shrink-0;

  &:before {
    @apply absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/5 content-[''] rounded-lg;
  }

  .rating {
    @apply absolute right-3 top-3 w-7 h-7 text-white font-bold flex items-center justify-center;
  }
}
</style>
