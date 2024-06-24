<template>
  <button @click="navigate" class="flex flex-col items-center p-2 hover:bg-gray-100 transition-colors duration-200">
    <div class="w-full flex justify-center items-center mb-1">
      <svg v-html="icon" class="w-6 h-6"></svg>
    </div>
    <span class="text-xs">{{ props.label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  route: { type: String, required: true },
});

import { useRouter } from 'vue-router';
const router = useRouter();

const navigate = () => {
  router.push({ name: props.route });
};
</script>

<style scoped>
/* Here you can add any additional scoped styles if needed */
</style>
