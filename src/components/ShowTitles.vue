<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import isLoading from '@/components/isLoading.vue'

const items = useStoreDVDs()
</script>

<template>
  <template v-if="!items.DVDsLoaded">
    <isLoading />
  </template>
  <template v-else>
    <div class="grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-6">
      <MovieCard
        v-for="item in items.DVDs"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :rating="item.rating"
      />
    </div>
    <div v-if="!items.DVDs.length">
      <h1>No DVDs found...</h1>
    </div>
  </template>
</template>
