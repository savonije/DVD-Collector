<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'

const items = useStoreDVDs()

console.log(items.DVDs)
</script>

<template>
  <div v-if="items.DVDs.length > 0">
    <MovieCard
      v-for="item in items.DVDs"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :rating="item.rating"
    />
  </div>
  <div v-else>
    <h1>No DVDs found...</h1>
  </div>
</template>
