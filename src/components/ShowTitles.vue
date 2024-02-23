<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'

const items = useStoreDVDs()
</script>

<template>
  <MovieCard
    v-for="item in items.DVDs"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :rating="item.rating"
  />
</template>
