<template>
    <ion-page>
        <Header />
        <ion-content class="ion=padding">
            <ion-list>
                <Ion-item>
                    <ion-input v-model="tipeDonasi" label="Jenis Donasi:" value="Hibah" readonly="true"></ion-input>
                </Ion-item>

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
                    <ion-input v-model="namaItem" type="text" label="Nama Barang" labelPlacement="floating"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input v-model.number="jumlahBarang" type="number" required label="Jumlah Barang"
                        labelPlacement="floating"></ion-input>
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

const router = useRouter()

const tipeDonasi = ref('Hibah')
const nama = ref()
const phone = ref('')
const email = ref()
const tipeItem = ref('Barang')
const namaItem = ref()
const jumlahBarang = ref(0)
const today = formatDate(new Date())
const tanggal = ref(today)

const isValidForm = computed(() => {
    return namaItem.value && jumlahBarang.value
})

const submitForm = () => {
    if (isValidForm.value) {
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
                amount: jumlahBarang.value,
                item: namaItem.value,
            },
            onSuccess: (response) => {
                console.log(response);
                router.push({ name: 'DonationDetail', params: { id: response } });
            },
            onError: (error) => {
                console.log(error);
            }
        })
        postDonation.reload();
    } else {
        console.log('Form is not valid')
    }
}
</script>