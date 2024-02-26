<script setup lang="ts">
import { reactive } from 'vue'

const credentials = reactive({
  email: '',
  password: ''
})

const submitForm = () => {
  if (!credentials.email || credentials.password) {
    alert('Please enter a email address and password')
  }
}
</script>

<template>
  <div class="container">
    <div class="bg-white p-6 shadow mx-auto max-w-[500px] rounded">
      <h1>Login</h1>
      <form @submit.prevent="submitForm">
        <fieldset class="mb-3">
          <label class="block font-bold">Email:</label>
          <input
            type="email"
            class="shadow border rounded w-full h-12"
            v-model="credentials.email"
          />
        </fieldset>

        <fieldset class="mb-3">
          <label class="block font-bold">Password:</label>
          <input
            type="password"
            class="shadow border rounded w-full h-12"
            v-model="credentials.password"
          />
        </fieldset>

        <div class="text-right mt-6">
          <button type="submit" class="button">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
