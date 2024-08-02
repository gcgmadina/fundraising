<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
      <div class="flex justify-center mb-4">
        <router-link :to="{ name: 'DonorHome' }">
          <img src="@/components/icons/Madina-logo.png" alt="Logo" class="h-12">

        </router-link>
      </div>
      <h2 class="text-2xl font-semibold text-center mb-4">Login</h2>
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input id="email" name="email" type="text" required autocomplete="email" placeholder="jane@example.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1 relative">
            <input :type="showPassword ? 'text' : 'password'" id="password" name="password" required
              autocomplete="current-password" placeholder="••••••"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" @click="togglePassword"
                class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
                <span>{{ showPassword ? 'Hide' : 'Show' }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link :to="{ name: 'ForgotPassword' }" class="font-medium text-indigo-600 hover:text-indigo-500">Lupa Password</router-link>
          </div>
        </div>
        <div>
          <button type="submit" :disabled="session.login.loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Masuk
          </button>
        </div>
        <div>
          <p class="text-sm text-center text-gray-600">Belum punya akun?
            <router-link :to="{ name: 'Register' }" class="font-medium text-indigo-600 hover:text-indigo-500">
              Daftar
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { session } from '../data/session';

const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function submit(e) {
  let formData = new FormData(e.target);
  session.login.submit({
    email: formData.get('email'),
    password: formData.get('password'),
  });
}
</script>

<style scoped>
body {
  background-color: #f0f4f8;
}
</style>
