<script setup lang="ts">
    import SearchIcon from '@/images/icons/search.svg';

    defineProps({ modelValue: String });
    const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="mb-9 flex justify-center">
        <div class="relative w-full max-w-[450px] text-gray-600">
            <SearchIcon
                class="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 transform text-gray-600"
            />
            <input
                class="w-full rounded-sm bg-white p-6 pl-12"
                :value="modelValue"
                type="text"
                placeholder="Search for a DVD..."
                @input="
                    emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement)?.value || '',
                    )
                "
            />
            <button
                v-if="modelValue"
                class="absolute top-0 right-0 p-6 text-xl leading-none"
                @click="emit('update:modelValue', '')"
            >
                &times;
            </button>
        </div>
    </div>
</template>
