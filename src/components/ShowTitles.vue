<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'

const items = useStoreDVDs()
</script>

<template>
  <div v-if="items.DVDs.length > 0" class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
