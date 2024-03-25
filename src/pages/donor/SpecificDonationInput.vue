<template>
    <ion-page>
        <Header/>
        <ion-content>
            <ion-list>
                <ion-item>
                    <h3>{{ event.subject }}</h3>
                </ion-item>

                <ion-item>
                    <ion-input v-model="nama" label="nama" labelPlacement="floating"/>
                </ion-item>
                <ion-item>
                    <ion-input v-model="phone" label="phone" labelPlacement="floating"/>
                </ion-item>
                <ion-item>
                    <ion-input v-model="email" label="email" labelPlacement="floating"/>
                </ion-item>
                <ion-item>
                    <ion-input v-model.number="jumlahDonasi" label="jumlahDonasi" labelPlacement="floating"/>
                </ion-item>
                <ion-item>
                    <ion-select v-model="metodePembayaran" label="metodePembayaran">
                        <ion-select-option value="cash">Cash</ion-select-option>
                        <ion-select-option value="tf">Transfer Bank</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item v-if="metodePembayaran === 'tf'">
                    <ion-input v-model="bank" type="text" label="Pilih Bank" labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>

                <ion-item>
                    <img alt="Silhouette of mountains" :src="event.thumbnail" class="w-full h-auto my-2"/>
                </ion-item>
            </ion-list>
        </ion-content>
        <Footer/>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Footer from '@/components/donor/Footer.vue'
import Header from '@/components/Header.vue'
import { createResource } from 'frappe-ui';
import { formatDateTime } from "@/data/DateUtils";


const router = useRouter();
const event = ref({});

const eventDetail = createResource({
    method: "GET",
    url: "non_profit.api.fundraising.get_event_by_id",
    auto: true,
    realtime: true,
    params: {
        event_id: router.currentRoute.value.params.id
    },
    transform(data) {
        event.value = data;
        // loading.value = false; // Data telah dimuat
        // console.log(data);
    }
});

onMounted(() => {
    eventDetail.reload();
});

const nama = ref();
const phone = ref('');
const email = ref();
const jumlahDonasi = ref(null);
const metodePembayaran = ref('');
const bank = ref('');
const today = formatDateTime(new Date());
const tanggal = ref(today);

const isValidForm = computed(() => {
    return jumlahDonasi.value !== null && metodePembayaran.value;
});

const submitForm = () => {
    if (isValidForm.value) {
        let postDonation = createResource({
            method: "POST",
            url: "non_profit.api.fundraising.new_donation",
            params: {
                donation_type: 'Specific Donation',
                fullname: nama.value,
                phone: phone.value,
                donor: email.value,
                item_type: 'Uang',
                date: tanggal.value,
                amount: jumlahDonasi.value,
                mode_of_payment: metodePembayaran.value,
                donation_event: router.currentRoute.value.params.id
            },
            onSuccess: (response) => {
                console.log(response);
            },
            onError: (error) => {
                console.log(error);
            }
        });
        postDonation.reload();
    }
};
</script>
