<script setup lang="ts">
import { useStoreDVDs } from '@/stores/storeDVDs'

const StoreDVD = useStoreDVDs()

const props = defineProps<{
  id: string
}>()

const submitForm = () => {
  StoreDVD.deleteDVD(props.id)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <button type="submit" class="button bg-red">Delete</button>
  </form>
</template>
