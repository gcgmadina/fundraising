<template>
    <ion-page>
        <Header />
        <ion-content class="ion-padding">
            <ion-card class="w-4/5 mx-auto flex flex-row">
                <img class="w-2/5 mx-auto" :src="journalEntryDetails.Fundraising_thumbnail"
                    alt="Thumbnail Penggalangan dana">
                <ion-card-content class="w-3/5 flex flex-col justify-around">
                    <ion-card-title class="text-lg">{{ journalEntryDetails.fundraising_name }}</ion-card-title>
                    <ion-card-subtitle>{{ journalEntryDetails.posting_date }}</ion-card-subtitle>
                </ion-card-content>
            </ion-card>

            <div class="flex justify-between mx-16 my-8">
                <span>Metode Pembayaran:</span>
                <span>{{ journalEntryDetails.mode_of_payment }}</span>
            </div>
            <div class="flex justify-between mx-16 my-8">
                <span>Dari (a/n):</span>
                <span>{{ journalEntryDetails.cheque_name }}</span>
            </div>
            <div class="flex justify-between mx-16 my-8">
                <span>No. Rekening:</span>
                <span>{{ journalEntryDetails.cheque_no }}</span>
            </div>
            <div class="flex justify-between mx-16 my-8">
                <span>Jumlah:</span>
                <span class="font-bold">Rp. {{ formatCurrency(journalEntryDetails.total_debit) }}</span>
            </div>
            <div class="flex justify-between mx-16 my-8">
                <span>Status:</span>
                <span :class="{
                    'text-blue-500': journalEntryDetails.docstatus === 'Menunggu Verifikasi',
                    'text-green-500': journalEntryDetails.docstatus === 'Diterima'
                }" class="font-bold">{{ journalEntryDetails.docstatus }}</span>
            </div>
        </ion-content>
        <div class="px-2 py-2 w-full">
            <ion-button
                v-if="user.data.roles.includes('Non Profit Accounting') && journalEntryDetails.docstatus == 'Menunggu Verifikasi'"
                expand="block" @click="verifyDonation"
            >
                Verifikasi
            </ion-button>

        </div>
        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from "@ionic/vue"
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { journalEntry } from '@/data/donation/Fundraising';
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrency } from "@/data/utils";

const router = useRouter()
const journalEntryDetails = ref({})
const user = inject('$user');

onMounted(async () => {
    await journalEntry.detail.fetch({
        journal_entry: router.currentRoute.value.params.id
    }).then((response) => {
        journalEntryDetails.value = response

    })
});

const verifyDonation = async () => {
    await journalEntry.verify.submit({
        name: journalEntryDetails.value.name
    })

    await journalEntry.detail.reload({
        journal_entry: router.currentRoute.value.params.id
    }).then((response) => {
        journalEntryDetails.value = response

    })
}
</script>