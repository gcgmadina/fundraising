<template>
    <ion-page>
        <Header />
        <ion-content class="ion=padding">
            <ion-list>
                <ion-item>
                    <ion-input v-model="tipeDonasi" label="Jenis Donasi:" value="Fidyah" :readonly="true"></ion-input>
                </ion-item>

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

                <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>

            </ion-list>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/vue'
import Header from "@/components/Header.vue"
import Footer from "@/components/donor/Footer.vue"
import { createResource } from "frappe-ui"
import { formatDate } from "@/data/DateUtils"
import PhoneInput from "@/components/PhoneInput.vue"
import InputAmount from "@/components/InputAmount.vue"
import { bankAccountList } from "@/data/accounting/BankList"
import { get_donation_qr } from "@/data/accounting/DonationQR"

const router = useRouter()

const tipeDonasi = ref('Fidyah')
const nama = ref()
const phone = ref()
const email = ref()
const tipeItem = ref('Uang')
const jumlahUang = ref(0)
const metodePembayaran = ref('Wire Transfer')
const bank = ref('')
const today = formatDate(new Date())
const tanggal = ref(today)
const qrImageUrl = ref()

const updateAmount = (amount) => {
    jumlahUang.value = amount
}

const isValidForm = computed(() => {
    if (metodePembayaran.value === 'Wire Transfer') {
        return jumlahUang.value && jumlahUang !== 0 && metodePembayaran.value && bank.value
    } else {
        return jumlahUang.value && jumlahUang !== 0 && metodePembayaran.value
    }
})

const submitForm = () => {
    if (isValidForm.value) {
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
                    bank: bank.value
                },
                onSuccess: (response) => {
                    console.log(response)
                    router.push({ name: 'DonationDetail', params: { id: response } })
                },
                onError: (error) => {
                    console.log(error)
                }
            });
            postDonation.reload()
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
    } else {
        alert('Form tidak valid')
    }
}

onMounted(() => {
    get_donation_qr()
        .then((qrImage) => {
            qrImageUrl.value = qrImage
        })
        .catch((error) => {
            console.error("Error fetching QR image:", error)
        })
})
</script>