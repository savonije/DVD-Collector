<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const query = route.query.q
</script>

<template>
  <DefaultLayout>Results...</DefaultLayout>
</template>
