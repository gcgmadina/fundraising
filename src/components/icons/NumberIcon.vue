<template>
    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon :fill="fillColor" points="50,10 90,50 50,90 10,50" />
        <text x="50" y="50" font-size="25" fill="white" text-anchor="middle" dominant-baseline="middle">
            {{ number }}
        </text>
    </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    number: {
        type: [String, Number],
        required: true,
    },
    color: {
        type: String,
        default: '#44475a', // Warna default fill
    },
});

const fillColor = computed(() => props.color);
</script>

<style scoped>
/* Tambahkan gaya CSS khusus jika diperlukan */
</style>
