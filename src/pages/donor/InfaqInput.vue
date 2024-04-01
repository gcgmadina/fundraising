<template>
  <ion-page>
    <Header></Header>
    <ion-content class="ion-padding">
      <ion-list>
        <IonItem>
          <IonInput v-model="tipeDonasi" label="Jenis Donasi:" value="Infaq" readonly="true" aria-label=""></IonInput>
        </IonItem>

        <ion-item>
          <ion-input v-model="nama" type="text" label="Nama" labelPlacement="floating"></ion-input>
        </ion-item>

        <ion-item>
          <PhoneInput v-model="phone"></PhoneInput>
        </ion-item>
        
        <ion-item>
          <ion-input v-model="email" type="email" label="Email" labelPlacement="floating"></ion-input>
        </ion-item>

        <InputAmount @amount-selected="updateAmount" />
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

        <ion-item v-if="metodePembayaran === 'tf'">
          <ion-input v-model="bank" type="text" label="Pilih Bank" labelPlacement="floating"></ion-input>
        </ion-item>

        <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>
      </ion-list>
    </ion-content>
    <Footer />
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import { createResource } from "frappe-ui"
import { formatDateTime } from "@/data/DateUtils";
import PhoneInput from "@/components/PhoneInput.vue";
import InputAmount from "@/components/InputAmount.vue";

const tipeDonasi = ref('Infaq');
const nama = ref();
const phone = ref('');
const email = ref();
const tipeItem = ref('Uang');
const today = formatDateTime(new Date());
const tanggal = ref(today);
const jumlahUang = ref(null);
const metodePembayaran = ref('');
const bank = ref('');

const isValidForm = computed(() => {
  return tanggal.value && jumlahUang.value !== null && metodePembayaran.value;
});

const updateAmount = (amount) => {
  jumlahUang.value = amount;
};

const submitForm = () => {
  if (isValidForm.value) {
    let postDonation = createResource({
      method: "POST",
      url: "non_profit.api.fundraising.new_donation",
      params: {
        donation_type: tipeDonasi.value,
        fullname: nama.value,
        phone: phone.value,
        donor: email.value,
        item_type: tipeItem.value,
        date: tanggal.value,
        amount: jumlahUang.value,
        mode_of_payment: metodePembayaran.value,
      },
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        console.log(error);
      }
    });
    postDonation.reload();
  } else {
    console.log('Form is not valid. Please fill in all required fields.');
  }
};
</script>