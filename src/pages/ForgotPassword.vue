<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-center mb-4">Masukkan Email</h2>
            <form class="space-y-6" @submit.prevent="submit">
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
                        Kirim
                    </button>
                </div>
            </form>
            <div class="mt-4 text-center">
                <p class="text-sm">
                    Kembali ke halaman
                    <router-link :to="{ name: 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Log in</router-link>
                </p>
            </div>
            <div v-if="notification" class="mt-4">
                <div v-if="notificationClass === 'success'"
                    class="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert">
                    <SuccessIcon class="w-6 h-6 mr-2" />
                    <span class="block sm:inline">{{ notification }}</span>
                </div>
                <div v-if="notificationClass === 'error'"
                    class="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert">
                    <FailedIcon class="w-6 h-6 mr-2" />
                    <span class="block sm:inline">{{ notification }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { forgotPassword } from '../data/user';
import SuccessIcon from '@/components/icons/SuccessIcon.vue'; // Import SuccessIcon
import FailedIcon from '@/components/icons/FailedIcon.vue'; // Import FailedIcon

const email = ref('');
const notification = ref('');
const notificationClass = ref('');

const formIsValid = computed(() => {
    return email.value.trim() !== '';
});

const router = useRouter();

function submit() {
    console.log('email', email.value);
    forgotPassword(email.value)
    notification.value = 'Ikuti petunjuk yang dikirim ke email Anda untuk mereset password';
    notificationClass.value = 'success';
}
</script>

<style scoped>
body {
    background-color: #f0f4f8;
}
</style>