<script setup lang="ts">
import { ref } from 'vue'
import ModalLayout from '@/layouts/ModalLayout.vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import { toast, type ToastOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const StoreDVD = useStoreDVDs()

const model = defineModel()

const title = ref('')
const rating = ref('1')

const closeModal = () => {
  model.value = false
}

const submitForm = () => {
  if (title.value !== '') {
    StoreDVD.addDVD(title.value, +rating.value)

    toast.success(`<strong>${title.value}</strong> has been added!`, {
      autoClose: 3000,
      theme: 'dark',
      dangerouslyHTMLString: true
    } as ToastOptions)

    title.value = ''
    rating.value = '1'
  }
}
</script>

<template>
  <ModalLayout>
    <h2 class="mb-0">Add a new DVD</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="block font-bold">Name:</label>
        <input type="text" id="name" class="px-6 py-3 border min-w-[400px]" v-model="title" />
      </div>

      <div class="mb-3">
        <label for="rating" class="block font-bold">Rating:</label>
        <select id="rating" class="px-6 py-3 border" v-model="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="flex justify-between">
        <button type="submit" class="button button-neutral" @click.prevent="closeModal">
          Cancel
        </button>
        <button type="submit" class="button" @click.prevent="submitForm">Submit</button>
      </div>
    </form>
  </ModalLayout>
</template>
