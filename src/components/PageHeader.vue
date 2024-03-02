<script setup lang="ts">
import router from '@/router'
import { useStoreAuth } from '@/stores/storeAuth'
import { ref } from 'vue'

const storeAuth = useStoreAuth()

const searchInput = ref('')

const submitForm = () => {
  router.push({ path: '/search', query: { query: searchInput.value } })
}
</script>

<template>
  <header class="container bg-shark text-white flex justify-between p-3 items-center mb-6">
    <RouterLink to="/">
      <span class="text-2xl font-bold font-heading">Mescie's DVD collection</span>
    </RouterLink>

    <form @submit.prevent="submitForm()">
      <input
        v-model="searchInput"
        type="text"
        placeholder="search..."
        class="p-2 min-w-[200px] rounded-l-sm text-shark"
      />
      <button type="submit" class="bg-teal p-2 rounded-r-sm text-shark font-bold">search</button>
    </form>

    <button
      type="button"
      aria-label="Logout user"
      class="button"
      @click="storeAuth.logoutUser"
      v-if="storeAuth.user?.id"
    >
      Logout
    </button>
  </header>
</template>
