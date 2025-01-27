<script setup lang="ts">
import { reactive } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const storeAuth = useStoreAuth()

const credentials = reactive({
  email: '',
  password: ''
})

const submitForm = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter a email address and password')
  } else {
    storeAuth.loginUser(credentials)
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="bg-white p-6 shadow-sm mx-auto max-w-[500px] rounded-sm">
        <h1>Login</h1>
        <form @submit.prevent="submitForm">
          <fieldset class="mb-3">
            <label class="block font-bold">Email:</label>
            <input
              type="email"
              class="shadow-sm border rounded-sm w-full h-12 p-3"
              v-model="credentials.email"
            />
          </fieldset>

          <fieldset class="mb-3">
            <label class="block font-bold">Password:</label>
            <input
              type="password"
              class="shadow-sm border rounded-sm w-full h-12 p-3"
              v-model="credentials.password"
            />
          </fieldset>

          <div class="text-right mt-6">
            <button type="submit" class="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>
