<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-center mb-4">Register to GCG Madina</h2>
            <form class="space-y-6" @submit.prevent="submit">
                <div>
                    <div class="mt-1">
                        <input v-model="fullname" id="fullname" name="fullname" type="text" required autocomplete="name"
                            placeholder="Full Name"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                </div>
                <div>
                    <div class="mt-1">
                        <input v-model="email" id="email" name="email" type="email" required autocomplete="email"
                            placeholder="Email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                </div>
                <div>
                    <button type="submit" :disabled="!formIsValid"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Register
                    </button>
                </div>
            </form>
            <div class="mt-4 text-center">
                <p class="text-sm">
                    Already have an account?
                    <router-link :to="{ name: 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Login</router-link>
                </p>
            </div>
            <div v-if="notification" class="mt-4 text-center">
                <p :class="notificationClass">{{ notification }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../data/user';

const fullname = ref('');
const email = ref('');
const redirect_to = ref(null);
const notification = ref('');
const notificationClass = ref('');

const formIsValid = computed(() => {
    return fullname.value.trim() !== '' && email.value.trim() !== '';
});

const router = useRouter();

function submit() {
    // Simulate a session register call
    console.log('Registering with:', { fullname: fullname.value, email: email.value });
    // Add your registration logic here
    registerUser(email.value, fullname.value, redirect_to.value)
        .then((message) => {
            notification.value = message;
            notificationClass.value = 'text-green-500';
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            notification.value = error.message;
            notificationClass.value = 'text-red-500';
        });
}
</script>

<style scoped>
body {
    background-color: #f0f4f8;
}
</style>
