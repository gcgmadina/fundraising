<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content class="ion-padding">
            <h1 class="text-center my-auto">Masukkan Jumlah Dana</h1>
            <h2 class="text-center my-auto">{{ router.currentRoute.value.params.name }}</h2>
            <ion-item>
                <ion-input v-model="amount" type="number" label="Nominal Pengeluaran"
                    labelPlacement="floating"></ion-input>
            </ion-item>
            <ion-item>
                <p>Tanggal Pembayaran</p>
                <ion-datetime-button datetime="datetime"></ion-datetime-button>
            </ion-item>
            <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="datetime" v-model="selectedDate"></ion-datetime>
            </ion-modal>
            <ion-button class="my-4" @click="submitForm" :disabled="isValidForm">Buat Data Pengeluaran</ion-button>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonItem, IonInput, IonButton, IonDatetimeButton, IonDatetime, IonModal } from '@ionic/vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createResource } from 'frappe-ui'
import { newExpense } from '@/data/accounting/Expenses'
import { formatDate } from "@/data/DateUtils"

const router = useRouter()
const amount = ref()
const selectedDate = ref()

const isValidForm = computed(() => {
    return !amount.value
})

const submitForm = async () => {
    if (!selectedDate.value) {
        selectedDate.value = new Date().toISOString();
    }
    await newExpense(router.currentRoute.value.params.name, amount.value, selectedDate.value)
}
</script>