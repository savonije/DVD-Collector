<script lang="ts" setup>
const props = defineProps<{
  name: string
  rating: number
}>()
</script>

<template>
  <div class="bg-white shadow mb-3 p-3 flex gap-3">
    <img src="https://placehold.it/100x150" width="100" height="150" />
    <h4>{{ props.name }}</h4>
    <span>{{ props.rating }}</span>
  </div>
</template>
