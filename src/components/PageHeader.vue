<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()
</script>

<template>
  <header class="bg-blue-600 text-white flex justify-between p-3 items-center mb-6">
    <span class="text-lg font-bold">Mescie's DVD collection</span>
    <button
      type="button"
      aria-label="Logout user"
      class="button"
      @click="storeAuth.logoutUser"
      v-if="storeAuth.user.id"
    >
      Logout
    </button>
  </header>
</template>
