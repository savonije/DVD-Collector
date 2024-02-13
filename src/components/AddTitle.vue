<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')

const submitForm = () => {
  fetch(import.meta.env.VITE_FIREBASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: title.value
    })
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
