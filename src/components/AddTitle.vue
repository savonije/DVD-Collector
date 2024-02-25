<script setup lang="ts">
import { ref } from 'vue'
import { useStoreDVDs } from '@/stores/storeDVDs'

const StoreDVD = useStoreDVDs()

const title = ref('')
const rating = ref(1)

const submitForm = () => {
  const parseRating = parseInt(rating.value)
  StoreDVD.addDVD(title.value, parseRating)

  title.value = ''
  rating.value = 1
}
</script>

<template>
  <div class="shadow p-6 bg-white mb-6">
    <h2>Add a new DVD</h2>
    <form @submit.prevent="submitForm" class="flex gap-3 items-center">
      <label for="name" class="block font-bold">Name:</label>
      <input type="text" id="name" class="px-6 py-3 border" v-model="title" />
      <label for="rating" class="block font-bold">Rating:</label>
      <select id="rating" class="px-6 py-3 border" v-model="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>
