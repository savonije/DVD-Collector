<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import { onMounted } from 'vue'

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})
</script>

<template>
  <RouterView />
</template>
