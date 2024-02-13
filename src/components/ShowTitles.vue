<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MovieCard from './MovieCard.vue'

const items = ref([])

const loadTitles = () => {
  fetch(import.meta.env.VITE_FIREBASE_URL)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((data) => {
      for (const id in data) {
        items.value.push({
          id: id,
          name: data[id].name,
          rating: data[id].rating
        })
      }
    })
}

onMounted(() => {
  loadTitles()
})
</script>

<template>
  <MovieCard v-for="item in items" :key="item.id" :name="item.name" />
</template>
