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
  <h1>DVD Database</h1>
  <form @submit.prevent="submitForm">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="title" />
    <button type="submit">Submit</button>
  </form>
</template>
