<script setup lang="ts">
import { ref, computed } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import isLoading from '@/components/isLoading.vue'

const items = useStoreDVDs()

const searchQuery = ref('')

const filteredDVDs = computed(() => {
  return items.DVDs.filter((dvd) =>
    dvd.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <template v-if="!items.DVDsLoaded">
    <isLoading />
  </template>
  <template v-else>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a DVD..."
        class="w-full p-4 mb-3 rounded"
      />
    </div>

    <div class="mb-3" v-if="searchQuery">
      Filtered <span class="font-bold">{{ filteredDVDs.length }}</span> out of
      <span class="font-bold">{{ items.DVDs.length }}</span> results
    </div>
    <div class="mb-3" v-else>
      Currently there are a total of <span class="font-bold">{{ items.DVDs.length }}</span> titles
      in the database.
    </div>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
      <MovieCard
        v-for="item in filteredDVDs"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :rating="item.rating"
      />
    </div>

    <div v-if="!filteredDVDs.length">
      <h1>No DVDs found...</h1>
    </div>
  </template>
</template>
