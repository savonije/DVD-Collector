<script setup lang="ts">
import { ref } from 'vue'
import ModalAddTitle from './ModalAddTitle.vue'

const isModalVisible = ref(false)
</script>

<template>
  <button type="button" class="button" @click="isModalVisible = true">Add movie</button>

  <ModalAddTitle v-if="isModalVisible" v-model="isModalVisible" />
</template>
