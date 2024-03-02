<script setup lang="ts">
import router from '@/router'
import type { Movie } from '@/types'
import { useStoreDVDs } from '@/stores/storeDVDs'
const StoreDVD = useStoreDVDs()

const props = defineProps<Movie>()

const model = defineModel()

const deleteTitle = () => {
  StoreDVD.deleteDVD(props.id)

  router.push({ path: '/' })
}

const closeModal = () => {
  model.value = false
}
</script>

<template>
  <div
    class="fixed z-10 w-full h-full bg-black-700/75 flex items-center justify-center left-0 top-0"
  >
    <div class="rounded shadow bg-white p-9 max-w-[500px]">
      <form>
        <div class="mb-6">
          <h2 class="mb-3 text-center">Are you sure?</h2>
          This will delete the movie <span class="font-bold">{{ name }}</span> from the database.
          This action cannot be undone.
        </div>
        <div class="flex justify-between gap-3">
          <button type="submit" class="button button-neutral" @click.prevent="closeModal">
            Cancel
          </button>
          <button type="submit" class="button button-danger" @click.prevent="deleteTitle">
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
