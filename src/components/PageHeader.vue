<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth'
import AddTitle from '@/components/AddTitle.vue'

const storeAuth = useStoreAuth()

const username = import.meta.env.VITE_USERNAME
</script>

<template>
  <header class="bg-shark text-teal p-3 mb-6">
    <div
      class="container flex justify-center sm:justify-between sm:items-center flex-col sm:flex-row gap-6"
    >
      <RouterLink to="/">
        <span class="text-2xl font-bold font-heading"> {{ username }}'s DVD collection </span>
      </RouterLink>

      <div class="flex gap-3 justify-end">
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
        <RouterLink class="button text-white" to="/login" v-else> Login </RouterLink>
      </div>
    </div>
  </header>
</template>
