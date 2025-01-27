<script setup lang="ts">
import { nextTick } from 'vue'
import router from '@/router'
import ModalLayout from '@/layouts/ModalLayout.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import type { Movie } from '@/types'
import { toast, type ToastOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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

const deleteTitle = async () => {
  if (!props.id) return
  StoreDVD.deleteDVD(props.id)

  await router.push({ path: '/' })

  await nextTick()

  toast.success(`<strong>${props.name}</strong> has been deleted!`, {
    autoClose: 3000,
    theme: 'dark',
    dangerouslyHTMLString: true
  } as ToastOptions)

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
