<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth'
import AddTitle from '@/components/AddTitle.vue'

const storeAuth = useStoreAuth()
</script>

<template>
  <header class="bg-shark text-teal p-3 mb-6">
    <div class="container flex justify-between items-center">
      <RouterLink to="/">
        <span class="text-2xl font-bold font-heading">Mescie's DVD collection</span>
      </RouterLink>

      <div class="flex gap-3">
        <AddTitle />

        <button
          type="button"
          aria-label="Logout user"
          class="button button-transparent text-white"
          @click="storeAuth.logoutUser"
          v-if="storeAuth.user?.id"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
