<script setup lang="ts">
import { ref } from 'vue'
import ModalDeleteTitle from './ModalDeleteTitle.vue'
import type { Movie } from '@/types'

const isModalVisibile = ref(false)

const props = defineProps<Movie>()
</script>

<template>
  <button type="submit" class="button bg-red" @click="isModalVisibile = true">Delete</button>

  <ModalDeleteTitle
    v-if="isModalVisibile"
    v-model="isModalVisibile"
    :id="props.id"
    :name="props.name"
    :rating="props.rating"
  />
</template>
