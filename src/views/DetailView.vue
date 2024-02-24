<script setup lang="ts">
import DeleteTitle from '@/components/DeleteTitle.vue'
</script>

<template>
  <div>
    <h1>{{ $route.params.name }}</h1>

    <DeleteTitle :id="$route.params.id" :name="$route.params.name" />
  </div>
</template>
