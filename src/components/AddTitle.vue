<script setup lang="ts">
import { ref } from 'vue'
import ModalAddTitle from './ModalAddTitle.vue'
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

const isModalVisible = ref(false)
</script>

<template>
  <button type="button" class="button" @click="isModalVisible = true" v-if="storeAuth.user?.id">
    Add movie
  </button>

  <ModalAddTitle v-model="isModalVisible" />
</template>
