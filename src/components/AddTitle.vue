<script setup lang="ts">
import { ref } from 'vue'
import { useStoreDVDs } from '@/stores/storeDVDs'
import { toast, type ToastOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const StoreDVD = useStoreDVDs()

const title = ref('')
const rating = ref('1')

const submitForm = () => {
  if (title.value !== '') {
    StoreDVD.addDVD(title.value, +rating.value)

    toast.success(`${title.value} has been added!`, {
      autoClose: 3000
    } as ToastOptions)

    title.value = ''
    rating.value = '1'
  }
}
</script>

<template>
  <div class="shadow p-6 bg-white mb-6">
    <h2>Add a new DVD</h2>
    <form @submit.prevent="submitForm" class="flex flex-wrap gap-3 items-center">
      <label for="name" class="block font-bold">Name:</label>
      <input type="text" id="name" class="px-6 py-3 border min-w-[400px]" v-model="title" />
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
      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>
