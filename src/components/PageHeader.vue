<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()
</script>

<template>
  <header class="bg-shark text-white flex justify-between p-3 items-center mb-6">
    <div class="container">
      <RouterLink to="/">
        <span class="text-2xl font-bold font-heading">Mescie's DVD collection</span>
      </RouterLink>

      <button
        type="button"
        aria-label="Logout user"
        class="button"
        @click="storeAuth.logoutUser"
        v-if="storeAuth.user?.id"
      >
        Logout
      </button>
    </div>
  </header>
</template>
