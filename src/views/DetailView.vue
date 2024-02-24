<script setup lang="ts">
import DeleteTitle from '@/components/DeleteTitle.vue'
</script>

<template>
  <div class="container bg-white shadow p-6">
    <h1>{{ $route.params.name }}</h1>

    <div class="flex justify-end">
      <DeleteTitle :id="$route.params.id" :name="$route.params.name" />
    </div>
  </div>
</template>
