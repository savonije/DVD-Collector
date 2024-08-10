<script setup lang="ts">
import { ref } from 'vue'
import ModalDeleteTitle from './ModalDeleteTitle.vue'
import type { Movie } from '@/types'

const isModalVisible = ref(false)

const props = defineProps<Movie>()
</script>

<template>
  <button
    type="submit"
    class="text-red font-bold opacity-50 hover:underline underline-offset-2"
    @click="isModalVisible = true"
  >
    Delete
  </button>

  <ModalDeleteTitle
    v-if="isModalVisible"
    v-model="isModalVisible"
    :id="props.id"
    :name="props.name"
    :rating="props.rating"
  />
</template>
