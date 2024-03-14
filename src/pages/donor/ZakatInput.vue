<template>
    <ion-page>
        <Header></Header>
        <ion-content class="ion-padding">
            <ion-list>
                <IonItem>
                    <IonSelect v-model="tipeDonasi" required label="Jenis Zakat">
                        <IonSelectOption value="Zakat Fitrah">Zakat Fitrah</IonSelectOption>
                        <IonSelectOption value="Zakat Mal">Zakat Mal</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <ion-item>
                  <ion-input v-model="nama" type="text" label="Nama" labelPlacement="floating"></ion-input>
                </ion-item>
        
                <ion-item>
                  <ion-input v-model="email" type="email" label="Email" labelPlacement="floating"></ion-input>
                </ion-item>
        
                <ion-item>
                  <ion-datetime v-model="tanggal" display-format="DD/MM/YYYY" :min="today"></ion-datetime>
                </ion-item>
        
                <ion-item>
                  <ion-input v-model.number="jumlahUang" type="number" required label="Jumlah Donasi"
                    labelPlacement="floating"></ion-input>
                </ion-item>
        
                <ion-item>
                  <ion-select v-model="metodePembayaran" required label="Metode Pembayaran">
                    <ion-select-option value="cash">Cash</ion-select-option>
                    <ion-select-option value="tf">Transfer Bank</ion-select-option>
                  </ion-select>
                </ion-item>
        
                <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>
              </ion-list>
        </ion-content>
        <Footer/>
    </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";

const tipeDonasi = ref('Infaq');
const nama = ref('');
const email = ref('');
const tipeItem = ref('Uang');
const today = new Date().toISOString(); // Today's date in ISO format
const tanggal = ref(today);
const jumlahUang = ref(null);
const metodePembayaran = ref(''); 

const isValidForm = computed(() => {
  return tanggal.value && jumlahUang.value !== null && metodePembayaran.value;
});

const submitForm = () => {
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