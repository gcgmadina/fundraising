<template>
  <BaseLayout :showHeroSection="false">
    <template #content>

      <h1 class="text-center my-auto">Masukkan Jumlah Dana</h1>
      <h2 class="text-center my-auto">{{ router.currentRoute.value.params.name }}</h2>
      <ion-item>
        <ion-input v-model="amount" type="number" label="Nominal Pengeluaran" labelPlacement="floating"></ion-input>
      </ion-item>
      <ion-item>
        <p>Tanggal Pembayaran</p>
        <ion-datetime-button datetime="datetime"></ion-datetime-button>
      </ion-item>
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime id="datetime" v-model="selectedDate"></ion-datetime>
      </ion-modal>
      <ion-button class="my-4" @click="openConfirmationDialog" :disabled="isValidForm">Buat Data
        Pengeluaran</ion-button>

      <!-- Confirmation Modal -->
      <ion-modal :is-open="isConfirmationModalOpen" @did-dismiss="closeConfirmationDialog">
        <ion-content class="ion-padding">
          <h2>Konfirmasi</h2>
          <p>Apakah Anda yakin data yang dimasukkan sudah benar?</p>
          <ion-button expand="block" @click="confirmSubmission">Lanjutkan</ion-button>
          <ion-button expand="block" color="light" @click="closeConfirmationDialog">Kembali</ion-button>
        </ion-content>
      </ion-modal>
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue'
import { IonContent, IonPage, IonItem, IonInput, IonButton, IonDatetimeButton, IonDatetime, IonModal } from '@ionic/vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { newExpense } from '@/data/accounting/Expenses'
import { formatDate } from "@/data/DateUtils"

const router = useRouter()
const amount = ref()
const today = new Date().toISOString()
const selectedDate = ref(today) // Gunakan format bawaan ISO 8601
const isConfirmationModalOpen = ref(false)

const isValidForm = computed(() => {
  return !amount.value
})

const openConfirmationDialog = () => {
  isConfirmationModalOpen.value = true
}

const closeConfirmationDialog = () => {
  isConfirmationModalOpen.value = false
}

const confirmSubmission = async () => {
  // console.log(selectedDate.value)
  const formattedDate = selectedDate.value.split('T')[0]
  await newExpense(router.currentRoute.value.params.name, amount.value, formattedDate)
  closeConfirmationDialog()
  router.push({ name: 'Expenses', params: { name: router.currentRoute.value.params.name } })
}
</script>