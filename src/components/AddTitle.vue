<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')

const submitForm = () => {
  axios
    .post(import.meta.env.VITE_FIREBASE_URL, {
      name: title.value
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<template>
  <div class="shadow p-6 bg-white mb-6">
    <h2>Add a new DVD</h2>
    <form @submit.prevent="submitForm">
      <label for="name" class="block font-bold">Name:</label>
      <input type="text" id="name" class="px-6 py-3 border" v-model="title" />
      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>
