<script lang="ts" setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps({ rating: Number });

    const ratingColor = ref('');

    const getRatingBgColor = (rating: number | undefined) => {
        if (!rating) {
            return;
        }

        if (rating < 5) {
            ratingColor.value = 'bg-red';
        } else if (rating < 7) {
            ratingColor.value = 'bg-orange-600';
        } else if (rating < 8) {
            ratingColor.value = 'bg-green-500';
        } else {
            ratingColor.value = 'bg-green-600';
        }
    };

    onMounted(() => {
        getRatingBgColor(props.rating);
    });
</script>

<template>
    <span :class="`rating ${ratingColor}`">
        {{ props.rating }}
    </span>
</template>

<style scoped>
    @reference "@/assets/main.css";

    .rating {
        @apply flex h-9 w-9 items-center justify-center font-bold text-white shadow;
    }
</style>
