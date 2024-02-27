<script setup lang="ts">
import router from '@/router'
import { useStoreDVDs } from '@/stores/storeDVDs'
const StoreDVD = useStoreDVDs()

const props = defineProps<{
  id: string
  name: string
}>()

const model = defineModel<boolean>()

const deleteTitle = () => {
  StoreDVD.deleteDVD(props.id)

  router.push({ path: '/' })
}

const closeModal = () => {
  //   emit('update:modelValue', false)
  model.value = false
}
</script>

<template>
  <div
    class="fixed z-10 w-full h-full bg-black-700/75 flex items-center justify-center left-0 top-0"
  >
    <div class="rounded shadow bg-white p-6">
      <form>
        <h5>Are you sure you want to delete {{ name }} ?</h5>
        <div class="flex gap-3">
          <button type="submit" class="button bg-black-300" @click.prevent="closeModal">
            Cancel
          </button>
          <button type="submit" class="button bg-red" @click.prevent="deleteTitle">Delete</button>
        </div>
      </form>
    </div>
  </div>
</template>
