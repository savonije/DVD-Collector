<script setup lang="ts">
import AddTitle from '@/components/AddTitle.vue'
import ShowTitles from '@/components/ShowTitles.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import { onMounted } from 'vue'
import PageHeader from '@/components/PageHeader.vue'

const storeDVDs = useStoreDVDs()

onMounted(() => {
  storeDVDs.getDVDs()
})
</script>

<template>
  <PageHeader />
  <main class="container">
    <AddTitle />
    <ShowTitles />
  </main>
</template>
