<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStoreDVDs } from '@/stores/storeDVDs'
import { onMounted } from 'vue'

const storeDVDs = useStoreDVDs()

onMounted(() => {
  storeDVDs.getDVDs()
})
</script>

<template>
  <RouterView />
</template>
