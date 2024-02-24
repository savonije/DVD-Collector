<script setup lang="ts">
import DeleteTitle from '@/components/DeleteTitle.vue'

const props = defineProps<{
  id: string
  name: string
  rating: number
}>()
</script>

<template>
  <div>
    <h1>This is an movie detail page</h1>

    <DeleteTitle :id="props.id" :name="props.name" />
  </div>
</template>
