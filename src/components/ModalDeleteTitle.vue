<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import router from '@/router'
import ModalLayout from '@/layouts/ModalLayout.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import type { Movie } from '@/types'

const props = defineProps<
  Movie & {
    modelValue: boolean
  }
>()

const emit = defineEmits(['update:modelValue'])

const StoreDVD = useStoreDVDs()

const closeModal = () => {
  emit('update:modelValue', false)
}

const deleteTitle = () => {
  if (!props.id) return
  StoreDVD.deleteDVD(props.id)
  router.push({ path: '/' })
  closeModal()
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
