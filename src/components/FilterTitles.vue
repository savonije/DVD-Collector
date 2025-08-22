<script setup lang="ts">
    import { Button, InputGroup, InputGroupAddon, InputText } from 'primevue';
    import { useI18n } from 'vue-i18n';

    defineProps({ modelValue: String });

    const emit = defineEmits(['update:modelValue']);

    const { t } = useI18n();
</script>

<template>
    <div class="mb-9 flex justify-center">
        <InputGroup class="relative w-full max-w-[450px] text-gray-600">
            <InputGroupAddon>
                <i class="pi pi-search"></i>
            </InputGroupAddon>

            <InputText
                :value="modelValue"
                :placeholder="`${t('common.searchDvd')}...`"
                class="h-16"
                @input="
                    emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement)?.value || '',
                    )
                "
            />

            <InputGroupAddon v-if="modelValue">
                <Button
                    label="&times;"
                    variant="text"
                    @click="emit('update:modelValue', '')"
                />
            </InputGroupAddon>
        </InputGroup>
    </div>
</template>
