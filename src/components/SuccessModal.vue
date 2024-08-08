<!-- src/components/Modal.vue -->
<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
            <component :is="validationSuccess ? SuccessIcon : FailedIcon" class="w-20 h-20 mx-auto mb-4" />
            <p v-if="validationSuccess" class="text-center text-2xl">{{ successMessage }}</p>
            <p v-else class="text-center text-2xl">{{ failureMessage }}</p>
            <ion-button class="mt-4" @click="closeModal">Tutup</ion-button>
        </div>
    </div>
</template>

<script setup>
import { IonButton } from '@ionic/vue';
import SuccessIcon from '@/components/icons/SuccessIcon.vue';
import FailedIcon from '@/components/icons/FailedIcon.vue';

const props = defineProps({
    isModalOpen: {
        type: Boolean,
        required: true,
    },
    validationSuccess: {
        type: Boolean,
        required: true,
    },
    closeModal: {
        type: Function,
        required: true,
    },
    successMessage: {
        type: String,
        default: 'Operasi Berhasil',
    },
    failureMessage: {
        type: String,
        default: 'Operasi Gagal',
    },
});
</script>
