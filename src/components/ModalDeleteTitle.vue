<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import router from '@/router'
import ModalLayout from '@/layouts/ModalLayout.vue'
import type { Movie } from '@/types'
import { useStoreDVDs } from '@/stores/storeDVDs'

const props = defineProps({
  id: String,
  name: String,
  rating: Number,
  modelValue: Boolean // Use this as `v-model` binding
})
const emit = defineEmits(['update:modelValue'])

const StoreDVD = useStoreDVDs()

// Close the modal by emitting `update:modelValue` as `false`
const closeModal = () => {
  emit('update:modelValue', false)
}

// Delete the title and close the modal afterward
const deleteTitle = () => {
  if (!props.id) return
  StoreDVD.deleteDVD(props.id)
  router.push({ path: '/' })
  closeModal() // Close the modal after deletion
}
</script>

<template>
  <ModalLayout :showModal="props.modelValue" @close="closeModal">
    <form>
      <div class="mb-6">
        <h2 class="mb-3 text-center">Are you sure?</h2>
        This will delete the movie <span class="font-bold">{{ props.name }}</span> from the
        database. This action cannot be undone.
      </div>
      <div class="flex justify-between gap-3">
        <button type="button" class="button button-neutral" @click.prevent="closeModal">
          Cancel
        </button>
        <button type="button" class="button button-danger" @click.prevent="deleteTitle">
          Delete
        </button>
      </div>
    </form>
  </ModalLayout>
</template>
