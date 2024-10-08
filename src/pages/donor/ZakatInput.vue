<template>
  <ion-page>
    <Header></Header>
    <ion-content class="ion-padding">
      <ion-list>
        <IonItem>
          <IonSelect v-model="tipeDonasi" required label="Jenis Zakat">
            <IonSelectOption value="Zakat Mal">Zakat Mal</IonSelectOption>
            <IonSelectOption value="Zakat Fitrah">Zakat Fitrah</IonSelectOption>
          </IonSelect>
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

        <ion-item>
          <ion-select v-model="tipeItem" required label="Jenis Zakat">
            <ion-select-option value="Uang">Uang</ion-select-option>
            <ion-select-option v-if="tipeDonasi === 'Zakat Fitrah'" value="Barang">Beras</ion-select-option>
          </ion-select>
        </ion-item>

        <div v-if="tipeItem === 'Uang'">
          <InputAmount @amount-selected="updateAmount" />
          <ion-item>
            <ion-input v-model.number="jumlahUang" type="number" required label="Jumlah Donasi"
              labelPlacement="floating"></ion-input>
          </ion-item>

          <ion-item>
            <ion-select v-model="metodePembayaran" required label="Metode Pembayaran">
              <!-- <ion-select-option value="cash">Cash</ion-select-option> -->
              <ion-select-option value="Wire Transfer" selected>Transfer Bank</ion-select-option>
              <ion-select-option v-if="qrImageUrl" value="QRIS">QRIS</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item v-if="metodePembayaran === 'Wire Transfer'">
            <ion-select v-model="bank" label="Pilih Bank">
              <ion-select-option v-for="account in bankAccountList" :key="account.id" :value="account.name">
                {{ account.bank }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <div v-if="tipeItem === 'Barang'">
          <ion-item>
            <ion-input v-model.number="jumlahBeras" type="number" required label="Jumlah Beras (Kg)"
              labelPlacement="floating"></ion-input>
          </ion-item>
        </div>

        <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>
      </ion-list>
    </ion-content>
    <Footer />
  </ion-page>
</template>

<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import { formatDate } from "@/data/DateUtils";
import PhoneInput from "@/components/PhoneInput.vue";
import { createResource } from "frappe-ui";
import InputAmount from "@/components/InputAmount.vue";
import { bankAccountList } from "@/data/accounting/BankList";
import { get_donation_qr } from "@/data/accounting/DonationQR";

const router = useRouter();

const tipeDonasi = ref('');
const nama = ref();
const phone = ref('');
const email = ref();
const tipeItem = ref('Uang');
const today = formatDate(new Date()); // Today's date in ISO format
const tanggal = ref(today);
const jumlahUang = ref(null);
const metodePembayaran = ref('Wire Transfer');
const bank = ref('');
const namaItem = ref('Beras');
const jumlahBeras = ref('0');
const qrImageUrl = ref();

const isValidForm = computed(() => {
  if (tipeItem.value === 'Barang') {
    return jumlahBeras.value !== null;
  } else if (tipeItem.value === 'Uang') {
    // return jumlahUang.value !== null && metodePembayaran.value;
    if (metodePembayaran.value === 'Wire Transfer') {
      return jumlahUang.value !== null && metodePembayaran.value && bank.value;
    } else {
      return jumlahUang.value !== null && metodePembayaran.value;
    }
  }
});

const updateAmount = (amount) => {
  jumlahUang.value = amount;
};

const submitForm = () => {
  if (isValidForm.value) {
    if (tipeItem.value == "Uang") {
      if (metodePembayaran.value === 'Wire Transfer') {
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
            bank: bank.value,
          },
          onSuccess: (response) => {
            console.log(response);
            router.push({ name: 'DonationDetail', params: { id: response } });
          },
          onError: (error) => {
            console.log(error);
          }
        });
        postDonation.reload();
      } else {
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
            router.push({ name: 'DonationDetail', params: { id: response } });
          },
          onError: (error) => {
            console.log(error);
          }
        });
        postDonation.reload();
      }
    } else if (tipeItem.value == "Barang") {
      console.log('Submitting form with Barang');
      let postDonation = createResource({
        method: "POST",
        url: "non_profit.api.fundraising.new_goods_donation",
        params: {
          donation_type: tipeDonasi.value,
          fullname: nama.value,
          phone: phone.value,
          donor: email.value,
          item_type: tipeItem.value,
          date: tanggal.value,
          amount: jumlahBeras.value,
          item: namaItem.value,
        },
        onSuccess: (response) => {
          console.log(response);
          router.push({ name: 'DonationDetail', params: { id: response } });
        },
        onError: (error) => {
          console.log(error);
        }
      });
      postDonation.reload();
    }
  } else {
    console.log('Form is not valid. Please fill in all required fields.');
  }
};

watchEffect(() => {
  if (tipeDonasi.value === 'Zakat Mal') {
    tipeItem.value = 'Uang';
    jumlahBeras.value = '0';
  }
  if (tipeDonasi.value === 'Zakat Fitrah') {
    jumlahUang.value = null;
    metodePembayaran.value = '';
    bank.value = '';
  }
});

onMounted(() => {
  get_donation_qr()
    .then((qrImage) => {
      qrImageUrl.value = qrImage;
    })
    .catch((error) => {
      console.error("Error fetching QR image:", error);
    });
});
</script>