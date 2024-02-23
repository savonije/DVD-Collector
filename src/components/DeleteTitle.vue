<script setup lang="ts">
import { db } from '@/firebase'
import { collection, deleteDoc, doc } from 'firebase/firestore'

const props = defineProps<{
  id: string
}>()

const submitForm = () => {
  deleteDoc(doc(collection(db, 'dvds'), props.id))
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <button type="submit" class="button bg-red">Delete</button>
  </form>
</template>
