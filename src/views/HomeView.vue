<script setup lang="ts">
import AddTitle from '@/components/AddTitle.vue'
import ShowTitles from '@/components/ShowTitles.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import { onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const storeDVDs = useStoreDVDs()

onMounted(() => {
  storeDVDs.getDVDs()
})
</script>

<template>
  <DefaultLayout>
    <AddTitle />
    <ShowTitles />
  </DefaultLayout>
</template>
