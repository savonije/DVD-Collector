<script setup lang="ts">
import { reactive } from 'vue'
import ModalDeleteTitle from './ModalDeleteTitle.vue'

const modals = reactive({
  deleteDVD: false
})

const props = defineProps<{
  id: string
  name: string
}>()
</script>

<template>
  <button type="submit" class="button bg-red" @click="modals.deleteDVD = true">Delete</button>

  <ModalDeleteTitle
    v-if="modals.deleteDVD"
    v-model="modals.deleteDVD"
    :id="props.id"
    :name="props.name"
  />
</template>
