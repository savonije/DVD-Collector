<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = defineProps<{
  id: string
  name: string
  rating: number
}>()

const ratingColor = ref('')

const getRatingBgColor = (rating: number) => {
  if (rating < 5) {
    ratingColor.value = 'bg-red'
  } else if (rating < 7) {
    ratingColor.value = 'bg-orange-600'
  } else if (rating < 8) {
    ratingColor.value = 'bg-green-500'
  } else {
    ratingColor.value = 'bg-green-600'
  }
}

onMounted(() => {
  getRatingBgColor(props.rating)
})
</script>

<template>
  <RouterLink
    :to="`/movie/${name}/${id}`"
    class="bg-white shadow hover:shadow-md transition-shadow mb-3 p-3 flex gap-3 justify-between"
  >
    <h4>{{ props.name }}</h4>
    <span :class="`w-7 h-7 text-white font-bold flex items-center justify-center ${ratingColor}`">
      {{ props.rating }}
    </span>
  </RouterLink>
</template>
