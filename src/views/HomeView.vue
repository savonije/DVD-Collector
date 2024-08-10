<script setup lang="ts">
import ModalAddTitle from '@/components/ModalAddTitle.vue'
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
    <ShowTitles />
  </DefaultLayout>
</template>
