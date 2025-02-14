<script setup lang="ts">
    import { reactive } from 'vue';

    import DefaultLayout from '@/layouts/DefaultLayout.vue';

    import { useStoreAuth } from '@/stores/storeAuth';

    const storeAuth = useStoreAuth();

    const credentials = reactive({
        email: '',
        password: '',
    });

    const submitForm = () => {
        if (!credentials.email || !credentials.password) {
            alert('Please enter a email address and password');
        } else {
            storeAuth.loginUser(credentials);
        }
    };
</script>

<template>
    <DefaultLayout>
        <div class="container">
            <div
                class="mx-auto max-w-[500px] rounded-sm bg-white p-6 shadow-sm"
            >
                <h1>Login</h1>
                <form @submit.prevent="submitForm">
                    <fieldset class="mb-3">
                        <label class="block font-bold">Email:</label>
                        <input
                            v-model="credentials.email"
                            class="h-12 w-full rounded-sm border p-3 shadow-sm"
                            type="email"
                        />
                    </fieldset>

                    <fieldset class="mb-3">
                        <label class="block font-bold">Password:</label>
                        <input
                            v-model="credentials.password"
                            class="h-12 w-full rounded-sm border p-3 shadow-sm"
                            type="password"
                        />
                    </fieldset>

                    <div class="mt-6 text-right">
                        <button class="button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </DefaultLayout>
</template>
