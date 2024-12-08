<script setup lang="ts">
import { ref, computed } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import isLoading from '@/components/isLoading.vue'
import { useDebounce } from '@/composables/useDebounce'

const items = useStoreDVDs()

const searchQuery = ref('')
const sortOrder = ref('name')

const debouncedSearchQuery = useDebounce(searchQuery, 500)

const filteredDVDs = computed(() => {
  const filtered = items.DVDs.filter((dvd) =>
    dvd.name.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase())
  )

  filtered.sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.name.localeCompare(b.name)
    }

    if (sortOrder.value === 'des') {
      return b.name.localeCompare(a.name)
    }

    if (sortOrder.value === 'rating') {
      const ratingA = a.rating ?? 0
      const ratingB = b.rating ?? 0

      return ratingB - ratingA
    }

    return 0
  })

  return filtered
})
</script>

<template>
  <template v-if="!items.DVDsLoaded">
    <isLoading />
  </template>
  <template v-else>
    <div class="flex justify-center">
      <div class="relative max-w-[450px] w-full">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a DVD..."
          class="w-full p-6 mb-3 rounded"
        />
        <button
          @click="searchQuery = ''"
          v-if="searchQuery"
          class="absolute right-0 top-0 p-6 text-xl leading-none"
        >
          &times;
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between mb-9">
      <div v-if="searchQuery">
        Filtered <span class="font-bold">{{ filteredDVDs.length }}</span> out of
        <span class="font-bold">{{ items.DVDs.length }}</span> results
      </div>
      <div v-else>
        Currently there are a total of <span class="font-bold">{{ items.DVDs.length }}</span> titles
        in the database.
      </div>

      <div>
        <select class="p-3 rounded font-bold" v-model="sortOrder">
          <option value="asc" selected>A-Z</option>
          <option value="des">Z-A</option>
          <option value="rating">Rating High - Low</option>
        </select>
      </div>
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
