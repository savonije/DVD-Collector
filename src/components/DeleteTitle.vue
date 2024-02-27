<script setup lang="ts">
import { ref } from 'vue'
import ModalDeleteTitle from './ModalDeleteTitle.vue'

const isModalVisibile = ref(false)

const props = defineProps<{
  id: string
  name: string
}>()
</script>

<template>
  <button type="submit" class="button bg-red" @click="isModalVisibile = true">Delete</button>

  <ModalDeleteTitle
    v-if="isModalVisibile"
    v-model="isModalVisibile"
    :id="props.id"
    :name="props.name"
  />
</template>
