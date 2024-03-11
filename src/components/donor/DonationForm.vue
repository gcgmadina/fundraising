<template>
    <ion-page>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Nama</ion-label>
            <ion-input v-model="nama" type="text"></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email"></ion-input>
          </ion-item>
  
          <ion-item>
            <!-- <ion-label position="floating">Tanggal</ion-label> -->
            <ion-datetime v-model="tanggal" display-format="DD/MM/YYYY" :min="today"></ion-datetime>
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Jumlah Uang</ion-label>
            <ion-input v-model.number="jumlahUang" type="number" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label>Metode Pembayaran</ion-label>
            <ion-select v-model="metodePembayaran" required>
              <ion-select-option value="cash">Cash</ion-select-option>
              <ion-select-option value="tf">Transfer Bank</ion-select-option>
            </ion-select>
          </ion-item>
  
          <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
  
  const nama = ref('');
  const email = ref('');
  const today = new Date().toISOString(); // Today's date in ISO format
  const tanggal = ref(today);
  const jumlahUang = ref(null);
  const metodePembayaran = ref('');
  
  const isValidForm = computed(() => {
    return tanggal.value && jumlahUang.value !== null && metodePembayaran.value;
  });
  
  const submitFoFrm = () => {
    if (isValidForm.value) {
      // Handle form submission logic here
      console.log('Form submitted:', {
        nama: nama.value,
        email: email.value,
        tanggal: tanggal.value,
        jumlahUang: jumlahUang.value,
        metodePembayaran: metodePembayaran.value,
      });
    } else {
      console.log('Form is not valid. Please fill in all required fields.');
    }
  };
  </script>