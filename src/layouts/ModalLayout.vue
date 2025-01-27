<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  showModal: Boolean
})
const emit = defineEmits(['close'])

const modalRef = ref(null)

onClickOutside(modalRef, () => {
  emit('close')
})

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div
    v-if="showModal"
    class="fixed z-10 w-full h-full bg-black-700/75 flex items-center justify-center left-0 top-0"
  >
    <div class="rounded shadow bg-white p-9 w-[95%] sm:max-w-[500px] text-black" ref="modalRef">
      <slot />
    </div>
  </div>
</template>
