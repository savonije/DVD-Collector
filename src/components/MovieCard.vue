<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="bg-white shadow mb-3 p-3 flex gap-3">
    <img src="https://placehold.it/100x150" width="100" height="150" />
    <h4>{{ name }}</h4>
  </div>
</template>
