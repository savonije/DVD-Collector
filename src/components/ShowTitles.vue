<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MovieCard from './MovieCard.vue'
import axios from 'axios'

const items = ref([])

const loadTitles = () => {
  axios.get(import.meta.env.VITE_FIREBASE_URL).then((response) => {
    for (const id in response.data) {
      items.value.push({
        id: id,
        name: response.data[id].name,
        rating: response.data[id].rating
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
