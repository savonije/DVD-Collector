<script setup lang="ts">
    import { Button, FloatLabel, InputText, Message, Password } from 'primevue';
    import { reactive, ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const { t } = useI18n();
    const storeAuth = useStoreAuth();

    const credentials = reactive({
        email: '',
        password: '',
    });

    const errorMessage = ref('');

    const submitForm = () => {
        if (!credentials.email) {
            errorMessage.value = t('errors.emailError');
        } else if (!credentials.password) {
            errorMessage.value = t('errors.passwordError');
        } else {
            errorMessage.value = '';
            storeAuth.loginUser(credentials);
        }
    };
</script>

<template>
    <DefaultLayout>
        <div
            class="mx-auto w-full rounded-sm bg-white p-6 shadow-sm sm:max-w-[500px] dark:bg-gray-950 dark:text-white"
        >
            <h1>{{ t('common.login') }}</h1>

            <form @submit.prevent="submitForm">
                <FloatLabel class="mb-6" variant="on">
                    <InputText
                        v-model="credentials.email"
                        id="username"
                        type="email"
                        fluid
                    />

                    <label class="font-bold" for="username">
                        {{ t('common.email') }}
                    </label>
                </FloatLabel>

                <FloatLabel class="mb-6" variant="on">
                    <Password
                        id="password"
                        v-model="credentials.password"
                        toggle-mask
                        fluid
                    />

                    <label class="font-bold" for="password">
                        {{ t('common.password') }}
                    </label>
                </FloatLabel>

                <Message v-if="errorMessage" severity="error">
                    {{ errorMessage }}
                </Message>

                <div class="mt-6 text-right">
                    <Button type="submit" :label="t('common.login')" />
                </div>
            </form>
        </div>
    </DefaultLayout>
</template>

<style>
    @import '@/assets/main.css';

    .p-password-input {
        @apply w-full;
    }
</style>
