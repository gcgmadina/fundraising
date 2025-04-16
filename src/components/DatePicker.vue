<template>
    <div class="w-full">
        <!-- Jika label ada, gunakan ion-item -->
        <ion-item v-if="label" class="border-b border-gray-300">
            <div class="flex flex-col space-y-2 w-full">
                <div class="flex justify-between items-center">
                    <ion-label class="text-gray-700 font-medium">{{ label }}</ion-label>
                    <ion-button fill="outline" @click="openModal" mode="ios">
                        {{ selectedDate ? selectedDate : 'Pilih' }}
                    </ion-button>
                </div>
            </div>
        </ion-item>

        <!-- Jika label tidak ada, tampilkan button biasa -->
        <div v-else>
            <ion-button fill="outline" @click="openModal" mode="ios">
                {{ selectedDate ? selectedDate : 'Pilih' }}
            </ion-button>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" 
             class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
             @click.self="closeModal">
            <div class="bg-white rounded-lg p-6 w-80 shadow-lg flex flex-col items-center">
                <ion-datetime 
                    v-model="selectedDateRaw"
                    @ionChange="updateDate"
                    presentation="date">
                </ion-datetime>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { IonItem, IonLabel, IonButton, IonDatetime } from '@ionic/vue';

const props = defineProps({
    label: String,    // Label untuk field (contoh: "Mulai" atau "Berakhir")
    modelValue: String // Nilai default yang dikirim dari parent
});

const emit = defineEmits(['update:modelValue']); 

const isModalOpen = ref(false);
const selectedDateRaw = ref(props.modelValue || new Date().toISOString().split('T')[0]);
const selectedDate = ref('');

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const updateDate = (event) => {
    if (event.detail.value) {
        selectedDate.value = new Date(event.detail.value).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        emit('update:modelValue', event.detail.value);
        closeModal(); // Modal akan tertutup otomatis setelah memilih tanggal
    }
};

// Perbarui tampilan saat nilai default berubah
watch(() => props.modelValue, (newVal) => {
    selectedDateRaw.value = newVal;
    selectedDate.value = new Date(newVal).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}, { immediate: true });

</script>
