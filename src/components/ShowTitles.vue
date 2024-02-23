<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import MovieCard from './MovieCard.vue'
import { db } from '@/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

interface Movie {
  id: string
  name: string
  rating: number
}

const items: Ref<Movie[] | undefined> = ref([])

onMounted(() => {
  onSnapshot(collection(db, 'dvds'), (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const dvds = {
        id: doc.id,
        name: doc.data().name,
        rating: doc.data().rating
      }

      items.value.push(dvds)
    })
  })
})
</script>

<template>
  <MovieCard
    v-for="item in items"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :rating="item.rating"
  />
</template>
